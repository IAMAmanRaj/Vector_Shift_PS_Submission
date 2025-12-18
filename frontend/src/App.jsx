import { PipelineUI } from "./features/PipelineUI.jsx";
import { SubmitButton } from "./features/Submit.jsx";
import { PipelineToolbar } from "./features/PipelineToolbar.jsx";

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
