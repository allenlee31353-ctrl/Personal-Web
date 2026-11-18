import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Copy, Check, Loader2, Mail, Send } from 'lucide-react';
import { profile, socials } from '../data/content';
import { Reveal } from './Reveal';

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const empty: Fields = { name: '', email: '', subject: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = '請輸入您的姓名（至少 2 個字）';
  if (!f.email.trim()) e.email = '請輸入 Email';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Email 格式似乎不正確';
  if (!f.subject.trim()) e.subject = '請輸入主旨';
  if (f.message.trim().length < 10) e.message = '請簡述您的需求（至少 10 個字）';
  return e;
}

function mailtoHref(f: Fields) {
  const body = `${f.message}\n\n—\n${f.name}\n${f.email}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
}

const subjects = ['專案合作', '技術顧問', '演講邀約', '職缺機會'];

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sent, setSent] = useState<Fields | null>(null);
  const [copied, setCopied] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [e.target.name]: e.target.value };
    setFields(next);
    if (touched[e.target.name as keyof Fields]) setErrors(validate(next));
  };
  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem('company') as HTMLInputElement)?.value) return; // honeypot
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        // No backend configured: simulate the request; the success screen offers a mail fallback.
        await new Promise((r) => setTimeout(r, 1100));
      }
      setSent(fields);
      setStatus('success');
      setFields(empty);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const field = (name: keyof Fields) => ({
    id: `f-${name}`,
    name,
    value: fields[name],
    onChange,
    onBlur,
    'aria-invalid': !!(touched[name] && errors[name]),
    'aria-describedby': touched[name] && errors[name] ? `f-${name}-err` : undefined,
    className: `field ${touched[name] && errors[name] ? '!border-[#E30000] focus:!ring-[#E30000]/15' : ''}`,
  });

  const Err = ({ name }: { name: keyof Fields }) =>
    touched[name] && errors[name] ? (
      <p id={`f-${name}-err`} className="mt-1.5 text-[13px] text-[#E30000] dark:text-[#FF6961]" role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-surface py-24 md:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className="display-2 mt-4 text-balance">
              一起打造下一個
              <br />
              值得被記住的產品。
            </h2>
            <p className="lead mt-6 max-w-md">無論是專案合作、技術顧問或只是想交流想法，都歡迎與我聯繫。我通常會在兩個工作天內回覆。</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-[13px] font-medium text-muted">Email</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-tight text-ink underline-offset-[6px] hover:text-accent hover:underline"
              >
                <Mail size={22} strokeWidth={1.8} aria-hidden="true" />
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-elevated px-3 text-[13px] font-medium text-ink/75 ring-1 ring-line/70 transition hover:text-ink"
                aria-live="polite"
              >
                {copied ? <Check size={14} className="text-[#30D158]" /> : <Copy size={14} />}
                {copied ? '已複製' : '複製'}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="text-[13px] font-medium text-muted">社群</p>
            <ul className="mt-3 divide-y divide-line/70 border-y border-line/70">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[56px] items-center justify-between gap-4 py-3"
                  >
                    <span className="text-[16px] font-medium text-ink">{s.label}</span>
                    <span className="flex items-center gap-2 truncate text-[14px] text-muted transition-colors group-hover:text-accent">
                      <span className="truncate">{s.handle}</span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">（在新視窗開啟）</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[32px] bg-elevated p-6 shadow-soft ring-1 ring-line/50 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' && sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-[#30D158]/15 text-[#30D158]"
                  >
                    <CheckCircle2 size={34} strokeWidth={1.8} />
                  </motion.span>
                  <h3 className="mt-6 text-[26px] font-semibold tracking-tight text-ink">感謝您的來信，{sent.name}！</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                    {ENDPOINT
                      ? '訊息已成功送出，我會盡快與您聯繫。'
                      : '訊息已整理完成。若想確保即時送達，也可以直接透過郵件寄出。'}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {!ENDPOINT && (
                      <a href={mailtoHref(sent)} className="btn-primary">
                        <Mail size={16} aria-hidden="true" /> 以郵件寄出
                      </a>
                    )}
                    <button type="button" className="btn-ghost" onClick={() => setStatus('idle')}>
                      再寫一封
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="合作洽詢表單"
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-tight text-ink">合作洽詢</h3>
                    <p className="mt-1 text-[14px] text-muted">所有欄位皆為必填。</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className="mb-1.5 block text-[14px] font-medium text-ink">
                        姓名
                      </label>
                      <input type="text" autoComplete="name" placeholder="王小明" required {...field('name')} />
                      <Err name="name" />
                    </div>
                    <div>
                      <label htmlFor="f-email" className="mb-1.5 block text-[14px] font-medium text-ink">
                        Email
                      </label>
                      <input type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" required {...field('email')} />
                      <Err name="email" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-subject" className="mb-1.5 block text-[14px] font-medium text-ink">
                      主旨
                    </label>
                    <input type="text" placeholder="想討論的主題" required {...field('subject')} />
                    <div className="mt-2.5 flex flex-wrap gap-2" aria-label="常見主旨">
                      {subjects.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            const next = { ...fields, subject: s };
                            setFields(next);
                            if (touched.subject) setErrors(validate(next));
                          }}
                          className={`min-h-[32px] rounded-full px-3 text-[13px] font-medium ring-1 transition ${
                            fields.subject === s
                              ? 'bg-accent text-white ring-accent'
                              : 'text-ink/70 ring-line hover:text-ink hover:ring-ink/30'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <Err name="subject" />
                  </div>

                  <div>
                    <label htmlFor="f-message" className="mb-1.5 block text-[14px] font-medium text-ink">
                      訊息
                    </label>
                    <textarea rows={5} maxLength={1000} placeholder="請簡述您的需求、時程與預算範圍…" required {...field('message')} />
                    <div className="flex items-start justify-between gap-4">
                      <Err name="message" />
                      <span className="ml-auto mt-1.5 text-[12px] tabular-nums text-muted">{fields.message.length} / 1000</span>
                    </div>
                  </div>

                  {/* honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  {status === 'error' && (
                    <p className="rounded-xl bg-[#E30000]/10 px-4 py-3 text-[14px] text-[#E30000] dark:text-[#FF6961]" role="alert">
                      送出時發生問題，請稍後再試，或直接寄信至 {profile.email}。
                    </p>
                  )}

                  <button type="submit" className="btn-primary w-full !min-h-[52px] text-[16px]" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" /> 傳送中…
                      </>
                    ) : (
                      <>
                        送出訊息 <Send size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
