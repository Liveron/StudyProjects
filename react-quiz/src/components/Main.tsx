import { ReactNode } from "react";

interface IMainProps {
  children: ReactNode;
}

export default function Main({ children }: IMainProps) {
  return <main className="main">{children}</main>;
}
