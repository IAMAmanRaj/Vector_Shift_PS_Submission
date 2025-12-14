import { PipelineToolbar } from "./features/Toolbar";
import { PipelineUI } from "./features/PipelineUI";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
