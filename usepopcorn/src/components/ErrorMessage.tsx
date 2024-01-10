interface IErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: IErrorMessageProps) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
