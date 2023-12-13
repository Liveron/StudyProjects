import { useState } from "react";
import AccordionItem from "./AccordionItem";

interface IAccorionProps {
  data: { title: string; text: string }[];
}

export default function Accordion({ data }: IAccorionProps) {
  const [curOpen, setCurOpen] = useState(-1);

  function handleOpen(num: number) {
    setCurOpen(num);
  }

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={handleOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}
