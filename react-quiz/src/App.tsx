import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ActionBase from "./actions/ActionBase";
import QuestionDto from "./models/dtos/QuestionDto";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

enum AppActionType {
  DataReceived,
  DataFailed,
  Start,
  NewAnswer,
  NextQuestion,
  Finish,
  Restart,
  Tick,
}

class AppAction extends ActionBase<AppActionType, any> {
  constructor(type: AppActionType, payload: any = {}) {
    super(type, payload);
  }

  public get type(): AppActionType {
    return this._type;
  }
  public get payload(): any {
    return this._payload;
  }
}

type AppState = {
  questions: QuestionDto[];
  status: string;
  index: number;
  answer: number;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

const initialState: AppState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: -1,
  points: 0,
  highscore: 0,
  secondsRemaining: 420,
};

function reducer(
  state: AppState,
  action: ActionBase<AppActionType, any>
): AppState {
  switch (action.type) {
    case AppActionType.DataReceived:
      return { ...state, questions: action.payload, status: "ready" };
    case AppActionType.DataFailed:
      return { ...state, status: "error" };
    case AppActionType.Start:
      return { ...state, status: "active" };
    case AppActionType.NewAnswer:
      const question = state.questions.at(state.index) as QuestionDto;

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case AppActionType.NextQuestion:
      return { ...state, index: state.index + 1, answer: -1 };
    case AppActionType.Finish:
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case AppActionType.Restart:
      return { ...initialState, questions: state.questions, status: "ready" };
    case AppActionType.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch(new AppAction(AppActionType.DataReceived, data)))
      .catch(() => dispatch(new AppAction(AppActionType.DataFailed)));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            onClick={() => dispatch(new AppAction(AppActionType.Start))}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              onClick={(index: number) =>
                dispatch(new AppAction(AppActionType.NewAnswer, index))
              }
              answer={answer}
            />
            <Footer>
              <Timer
                onTick={() => dispatch(new AppAction(AppActionType.Tick))}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                onClick={() =>
                  dispatch(new AppAction(AppActionType.NextQuestion))
                }
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                onEndClick={() => dispatch(new AppAction(AppActionType.Finish))}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            onClick={() => dispatch(new AppAction(AppActionType.Restart))}
          />
        )}
      </Main>
    </div>
  );
}
