import Navbar from "./navbar";
import UploadForm from "./upload-form";

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

function Layout({
  children,
  state,
  toggleCollapse,
  onChange,
  onSubmit,
}: {
  children: React.ReactNode;
  state: State;
  toggleCollapse: (bool: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <button
          className="btn btn-success float-end"
          onClick={() => toggleCollapse(!state.isCollapsed)}
        >
          {state.isCollapsed ? "Close Upload Form" : "Add Image"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={state.inputs}
          isVisible={state.isCollapsed}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {children}
      </div>
    </>
  );
}

export default Layout;
