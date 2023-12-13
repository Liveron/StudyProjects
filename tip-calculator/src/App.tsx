import Bill from "./components/Bill";
import Like from "./components/Like";

export default function App() {
  return (
    <div>
      <Bill>
        <span>How much was the bill?</span>
      </Bill>
      <Like>
        <span>How did you like the service?</span>
      </Like>
    </div>
  );
}
