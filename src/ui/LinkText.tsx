interface Props {
  children: React.ReactNode;
}

export const LinkText = ({ children }: Props) => (
  <span className="font-bold text-rose-400 underline">{children}</span>
);
