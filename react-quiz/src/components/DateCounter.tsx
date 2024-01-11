import { ChangeEvent, useReducer } from "react";
import ActionBase from "../actions/ActionBase";

enum CounterActionTypes {
  Inc,
  Dec,
  SetCount,
  SetStep,
  Reset,
}

class CounterAction extends ActionBase<CounterActionTypes, number> {
  constructor(type: CounterActionTypes, payload = 0) {
    super(type, payload);
  }

  public get type(): CounterActionTypes {
    return this._type;
  }
  public get payload(): number {
    return this._payload;
  }
}

class CounterState {
  count = 0;
  step = 1;
}

const initialState: CounterState = { count: 0, step: 1 };

function reducer(
  state: CounterState,
  action: ActionBase<CounterActionTypes, number>
): CounterState {
  switch (action.type) {
    case CounterActionTypes.Dec:
      return {
        ...state,
        count: state.count >= state.step ? state.count - state.step : 0,
      };
    case CounterActionTypes.Inc:
      return { ...state, count: state.count + state.step };
    case CounterActionTypes.SetCount:
      return { ...state, count: action.payload };
    case CounterActionTypes.SetStep:
      return { ...state, step: action.payload };
    case CounterActionTypes.Reset:
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch(new CounterAction(CounterActionTypes.Dec));
  };

  const inc = function () {
    dispatch(new CounterAction(CounterActionTypes.Inc));
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      new CounterAction(CounterActionTypes.SetCount, Number(e.target.value))
    );
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      new CounterAction(CounterActionTypes.SetStep, Number(e.target.value))
    );
  };

  const reset = function () {
    dispatch(new CounterAction(CounterActionTypes.Reset));
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
