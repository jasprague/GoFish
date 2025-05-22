import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    link: string;
    type?: "submit";
    variant?: "default" | "alt"; // Optional variant
  }

export default function Button({text, type, link, variant = "default"}:ButtonProps) {
  return (
    <>        
        <Link href={`${link}`} type={type === 'submit' ? 'submit' : ''} className={`${styles.button} ${variant === 'alt' ? `${styles.alt}` : ''}`}>{text}</Link>
    </>

  );
}