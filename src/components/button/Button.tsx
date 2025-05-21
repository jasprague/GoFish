import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    link: string;
    variant?: "default" | "alt"; // Optional variant
  }

export default function Button({text, link, variant = "default"}:ButtonProps) {
  return (
    <>        
        <Link href={`${link}`} className={`${styles.button} ${variant === 'alt' ? `${styles.alt}` : ''}`}>{text}</Link>
    </>

  );
}