import { Reveal } from './Reveal';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', id }: Props) {
  const center = align === 'center';
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display-2 mt-4 whitespace-pre-line text-balance">
        {title}
      </h2>
      {description && <p className={`lead mt-5 text-pretty ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{description}</p>}
    </Reveal>
  );
}
