import { MotionConfig } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { Projects } from './components/Projects';
import { Impact } from './components/Impact';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    // "user" honours prefers-reduced-motion for every transform animation.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        跳至主要內容
      </a>
      <Loader />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Impact />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
