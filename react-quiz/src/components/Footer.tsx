import { ReactNode } from "react";

interface IFooterProps {
  children: ReactNode;
}

export default function Footer({ children }: IFooterProps) {
  return <footer>{children}</footer>;
}
