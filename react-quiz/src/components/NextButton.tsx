interface INextButtonProps {
  onClick: () => void;
  onEndClick: () => void;
  answer: number;
  index: number;
  numQuestions: number;
}

export default function NextButton({
  onClick,
  onEndClick,
  answer,
  index,
  numQuestions,
}: INextButtonProps) {
  if (answer === -1) return null;

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={onClick}>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={onEndClick}>
        Finish
      </button>
    );
  else return null;
}
