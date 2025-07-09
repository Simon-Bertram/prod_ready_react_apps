import "./App.css";
import Navbar from "./components/navbar";
import Card from "./components/card";

const photos = [
  "https://picsum.photos/id/1001/200/200",
  "https://picsum.photos/id/1002/200/200",
  "https://picsum.photos/id/1003/200/200",
  "https://picsum.photos/id/1004/200/200",
  "https://picsum.photos/id/1005/200/200",
  "https://picsum.photos/id/1006/200/200",
  "https://picsum.photos/id/1007/200/200",
  "https://picsum.photos/id/1008/200/200",
  "https://picsum.photos/id/1009/200/200",
];

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container text-center mt-5">
          <h1>Gallery</h1>
          <div className="row mt-5">
            {Array.from({ length: 12 }, (_, index) => (
              <div className="col mb-5">
                <Card src={photos[index]} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
