import { useEffect, useReducer } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Card from "./components/card";
import UploadForm from "./components/upload-form";

interface Inputs {
  title: string | null;
  file: File | null;
  path: string | null;
}

interface State {
  items: string[];
  count: number;
  inputs: Inputs;
  isCollapsed: boolean;
}

type Action =
  | {
      type: "setItem";
      payload: {
        path: string;
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

const photos: string[] = [];

const initialState: State = {
  items: photos,
  count: photos.length,
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
        items: [action.payload.path, ...state.items],
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
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = (bool: boolean) =>
    dispatch({ type: "collapse", payload: { bool } });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "setInputs", payload: { value: e } });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.inputs.path) {
      dispatch({ type: "setItem", payload: { path: state.inputs.path } });
      toggleCollapse(false);
    }
  };

  const count = `You have ${state.items.length} image${
    state.items.length > 1 ? "s" : ""
  }`;

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container text-center mt-5">
          <button
            className="btn btn-success float-end"
            onClick={() => toggleCollapse(!state.isCollapsed)}
          >
            {state.isCollapsed ? "Close Upload Form" : "Add Image"}
          </button>
          <UploadForm
            inputs={state.inputs}
            isVisible={state.isCollapsed}
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
          />
          <h1 className="mb-5">Gallery</h1>
          <h3>Count: {count}</h3>
          <div className="row mt-5">
            {state.items.map((photo, index) => (
              <Card key={`${photo}-${index}`} src={photo} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
