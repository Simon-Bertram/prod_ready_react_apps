import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Card from "./components/card";
import UploadForm from "./components/upload-form";

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
  const [items, setItems] = useState(photos);
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
    if (inputs.file) {
      setItems([inputs.file, ...items]);
    }
  };

  const handleCollapse = () => setIsCollapsed(!isCollapsed);

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
            {isCollapsed ? "Hide" : "Add"}
          </button>
          <UploadForm
            isVisible={isCollapsed}
            onChange={handleOnChange}
            onSubmit={handleOnSubmit}
          />
          <h1>Gallery</h1>
          <div className="row mt-5">
            {items.map((photo) => (
              <Card key={photo} src={photo} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
