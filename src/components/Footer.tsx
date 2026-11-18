import { ArrowUp } from 'lucide-react';
import { navItems, profile, socials } from '../data/content';

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-canvas">
      <div className="container-site py-12 md:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <p className="text-[19px] font-semibold tracking-tight text-ink">
              {profile.nameEn}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{profile.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[14px] sm:gap-16">
            <nav aria-label="頁尾導覽">
              <p className="font-semibold text-ink">網站</p>
              <ul className="mt-3 space-y-2">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="text-muted transition-colors hover:text-ink">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-semibold text-ink">社群</p>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line/70 pt-6 text-[12px] text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name} {profile.nameEn}. 版權所有。
          </p>
          <a href="#top" className="inline-flex min-h-[44px] items-center gap-1.5 transition-colors hover:text-ink">
            回到頂端 <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
