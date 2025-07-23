import { useEffect, useMemo, useReducer } from "react";
import "./App.css";
import Card from "./components/card";
import Layout from "./components/layout";

interface Inputs {
  title: string | null;
  file: File | null;
  path: string | null;
}

interface State {
  items: { path: string; title: string }[];
  inputs: Inputs;
  isCollapsed: boolean;
}

type Action =
  | {
      type: "setItem";
      payload: {
        path: string;
        title: string;
      };
    }
  | {
      type: "setInputs";
      payload: {
        value: React.ChangeEvent<HTMLInputElement>;
      };
    }
  | {
      type: "collapse";
      payload: {
        bool: boolean;
      };
    };

const initialState: State = {
  items: [],
  inputs: {
    title: null,
    file: null,
    path: null,
  },
  isCollapsed: false,
};

const handleOnChange = (
  state: State,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.name === "file" && e.target.files && e.target.files[0]) {
    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else {
    return { ...state.inputs, title: e.target.value };
  }
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [
          { path: action.payload.path, title: action.payload.title },
          ...state.items,
        ],
        inputs: { title: null, file: null, path: null },
      };
    case "setInputs":
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value),
      };
    case "collapse":
      return {
        ...state,
        isCollapsed: action.payload.bool,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleCollapse = (bool: boolean) =>
    dispatch({ type: "collapse", payload: { bool } });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "setInputs", payload: { value: e } });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.inputs.path && state.inputs.title) {
      dispatch({
        type: "setItem",
        payload: { path: state.inputs.path, title: state.inputs.title },
      });
      toggleCollapse(false);
    }
  };

  const count = useMemo(() => {
    return `You have ${state.items.length} image${
      state.items.length !== 1 ? "s" : ""
    }`;
  }, [state.items]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Layout
      state={state}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      toggleCollapse={toggleCollapse}
    >
      <h1 className="mb-5 text-center">Gallery</h1>
      <h3>Count: {count}</h3>
      <div className="row mt-5">
        {state.items.map((item, index) => (
          <Card key={`${item}-${index}`} {...item} title={item.title} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
