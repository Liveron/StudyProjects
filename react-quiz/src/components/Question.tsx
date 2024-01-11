import QuestionDto from "../models/dtos/QuestionDto";
import Options from "./Options";

interface IQuestionProps {
  question: QuestionDto;
  onClick: (answer: number) => void;
  answer: number;
}

export default function Question({
  question,
  onClick,
  answer,
}: IQuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} onClick={onClick} answer={answer} />
    </div>
  );
}
