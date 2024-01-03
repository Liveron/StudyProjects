import { ReactNode, useState } from "react";

type ListBoxProps = {
  children: ReactNode;
};

export default function Box({ children }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}
