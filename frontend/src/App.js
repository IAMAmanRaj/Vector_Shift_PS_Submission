import { PipelineUI } from "./features/PipelineUI";
import { SubmitButton } from "./features/Submit";
import { PipelineToolbar } from "./features/PipelineToolbar";

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
