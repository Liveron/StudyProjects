import { ReactNode } from "react";

interface ILikeProps {
  children: ReactNode;
}

export default function Like({ children }: ILikeProps) {
  return (
    <div>
      {children}
      <select>
        <option>It was good (10%)</option>
      </select>
    </div>
  );
}
