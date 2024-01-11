import QuestionDto from "../models/dtos/QuestionDto";

interface IOptionsProps {
  question: QuestionDto;
  onClick: (answer: number) => void;
  answer: number;
}

export default function Options({ question, onClick, answer }: IOptionsProps) {
  const hasAnswered = answer !== -1;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== -1}
          onClick={() => onClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
