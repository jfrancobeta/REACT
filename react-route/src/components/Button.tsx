import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type || "primary"]}`}
    >
      {children}
    </button>
  );
}
