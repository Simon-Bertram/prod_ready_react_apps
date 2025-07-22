import { useState, useEffect, useReducer } from "react";
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

interface Action {
  type: "setItem";
  payload: {
    path: string;
  };
}

const photos = [
  "https://picsum.photos/id/1001/200/200",
  "https://picsum.photos/id/1002/200/200",
  "https://picsum.photos/id/1003/200/200",
  "https://picsum.photos/id/1004/200/200",
  "https://picsum.photos/id/1005/200/200",
  "https://picsum.photos/id/1006/200/200",
  "https://picsum.photos/id/1008/200/200",
  "https://picsum.photos/id/1009/200/200",
];

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

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [action.payload.path, ...state.items],
      };
    default:
      return state;
  }
}

function App() {
  const [inputs, setInputs] = useState<{
    title: string | null;
    file: File | null;
    path: string | null;
  }>({
    title: null,
    file: null,
    path: null,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file" && e.target.files && e.target.files[0]) {
      setInputs({
        title: e.target.name,
        file: e.target.files[0],
        path: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.path) {
      // setItems([inputs.path, ...items]);
      dispatch({ type: "setItem", payload: { path: inputs.path } });
      setInputs({
        title: null,
        file: null,
        path: null,
      });
      handleCollapse();
    }
  };

  const handleCollapse = () => setIsCollapsed(!isCollapsed);

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
            onClick={handleCollapse}
          >
            {isCollapsed ? "Close Upload Form" : "Add Image"}
          </button>
          <UploadForm
            inputs={inputs}
            isVisible={isCollapsed}
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
