interface IProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number;
}

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: IProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== -1)} />

      <p>
        Questions <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
