import { ReactNode } from "react";

interface IBillProps {
  children: ReactNode;
}

export default function Bill({ children }: IBillProps) {
  return (
    <div>
      {children}
      <input type="number" />
    </div>
  );
}
