import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    link: string;
    variant?: "default" | "alt";
  }

export default function Button({text, link, variant = "default"}:ButtonProps) {
  const className = `${styles.button} ${variant === 'alt' ? styles.alt : ''}`
  const isExternal = link.startsWith('http://') || link.startsWith('https://')

  if (isExternal) {
    return <a href={link} target="_blank" rel="noopener noreferrer" className={className}>{text}</a>
  }

  return <Link href={link} className={className}>{text}</Link>
}
