import { useReducer } from "react";



// Reducer que hace return state + action (solo para números)
function reducer(state: State, action: {type: string, payload: number}) {
  switch(action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'defineCount':
      return { ...state, count: action.payload };
    case 'defineStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

interface State {
  count: number;
  step: number;
}
function DateCounter() {
  const initalState : State = {
    count: 0,
    step: 1
  }
  const [state, dispatch] = useReducer(reducer, initalState);


  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({type: 'dec', payload: -state.step });
  };

  const inc = function () {
    dispatch({type: 'inc', payload: state.step });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({type: 'defineCount', payload: Number(e.target.value)});
  };

  const reset = function () {
    dispatch({type: 'reset', payload: -state.count});
  };

  return (
    <div className="counter">
      <div>
        {/* No hay step, solo count */}
        <input value={state.step} onChange={e => dispatch({type: 'defineStep', payload: Number(e.target.value)})} />
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
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