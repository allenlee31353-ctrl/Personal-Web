import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { articleCategories, articles, profile, type Article } from '../data/content';
import { formatDate } from '../lib/format';
import { Modal } from './Modal';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type Filter = (typeof articleCategories)[number];

function ArticleReader({ article }: { article: Article }) {
  const id = `article-title-${article.id}`;
  return (
    <article aria-labelledby={id} className="px-6 pb-12 pt-16 sm:px-14 sm:pb-16 sm:pt-20">
      <div className="mx-auto max-w-2xl">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
          <span className="font-medium text-accent">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} aria-hidden="true" /> {article.readTime} 分鐘閱讀
          </span>
        </p>
        <h2 id={id} className="mt-4 text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.2] tracking-display text-ink">
          {article.title}
        </h2>
        <p className="mt-5 text-[19px] leading-relaxed text-ink/75">{article.excerpt}</p>
        <hr className="my-10 border-line/70" />
        <div className="space-y-6">
          {article.body.map((p, i) => (
            <p key={i} className="text-[17px] leading-[1.9] text-ink/85">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-4 rounded-2xl bg-surface p-5">
          <img src={profile.avatar} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <div className="text-[14px]">
            <p className="font-semibold text-ink">
              {profile.name} {profile.nameEn}
            </p>
            <p className="text-muted">{profile.role}</p>
          </div>
          <a href="#contact" className="link-arrow ml-auto shrink-0 text-[14px]" data-close-modal>
            與我討論
          </a>
        </div>
      </div>
    </article>
  );
}

export function Insights() {
  const [filter, setFilter] = useState<Filter>('全部');
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  const sorted = useMemo(() => [...articles].sort((a, b) => b.date.localeCompare(a.date)), []);
  const list = filter === '全部' ? sorted : sorted.filter((a) => a.category === filter);
  const open = articles.find((a) => a.id === openId);

  return (
    <section id="insights" aria-labelledby="insights-title" className="py-24 md:py-36">
      <div className="container-site">
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          title="觀察、研究與思考。"
          description="記錄我在產業第一線的觀察與實作心得，希望對同樣在科技路上前進的你有所幫助。"
        />

        <Reveal className="mt-12 md:mt-16">
          <div
            role="tablist"
            aria-label="文章分類"
            className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:inline-flex sm:rounded-full sm:bg-surface sm:p-1 sm:px-1"
          >
            {articleCategories.map((c) => {
              const selected = filter === c;
              const count = c === '全部' ? articles.length : articles.filter((a) => a.category === c).length;
              return (
                <button
                  key={c}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="insights-list"
                  onClick={() => setFilter(c)}
                  className={`relative min-h-[40px] shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors ${
                    selected ? 'text-canvas sm:text-ink' : 'bg-surface text-ink/65 hover:text-ink sm:bg-transparent'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="insight-tab"
                      className="absolute inset-0 -z-0 rounded-full bg-ink shadow-soft sm:bg-elevated"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">
                    {c}
                    <span className="ml-1.5 text-[12px] tabular-nums opacity-50">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul id="insights-list" role="tabpanel" aria-label={`${filter}文章`} className="mt-8 border-t border-line/70">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((a) => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-line/70"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(a.id)}
                  aria-haspopup="dialog"
                  className="group -mx-4 grid w-[calc(100%+2rem)] gap-3 rounded-2xl px-4 py-7 text-left transition-colors duration-300 hover:bg-surface md:grid-cols-[180px_1fr_auto] md:items-center md:gap-10 md:py-9"
                >
                  <div className="flex items-center gap-3 text-[13px] text-muted md:flex-col md:items-start md:gap-1">
                    <time dateTime={a.date} className="tabular-nums">
                      {formatDate(a.date)}
                    </time>
                    <span className="font-medium text-accent">{a.category}</span>
                  </div>
                  <div>
                    <h3 className="text-pretty text-[20px] font-semibold leading-snug tracking-tight text-ink md:text-[24px]">
                      {a.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
                  </div>
                  <span className="hidden items-center gap-3 text-[13px] text-muted md:flex">
                    {a.readTime} 分鐘
                    <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line transition-all duration-500 ease-apple group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
                      <ArrowUpRight size={18} className="transition-transform duration-500 ease-apple group-hover:rotate-45" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <Modal key="article" onClose={close} labelledBy={`article-title-${open.id}`}>
            <div
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('[data-close-modal]')) {
                  e.preventDefault();
                  close();
                  window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 420);
                }
              }}
            >
              <ArticleReader article={open} />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
