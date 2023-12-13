import { ReactNode, useState } from "react";

interface IAccordionItemProps {
  num: number;
  title: string;
  curOpen: number;
  onOpen: (num: number) => void;
  children: ReactNode;
}

export default function AccordionItem({
  num,
  title,
  curOpen,
  onOpen,
  children,
}: IAccordionItemProps) {
  const isOpen = num === curOpen;

  function handleToggle() {
    onOpen(isOpen ? -1 : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>

      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
