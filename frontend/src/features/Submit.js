import { useState } from "react";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { HiPlay } from "react-icons/hi2";
import { Toast } from "../components/Toast";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState(null);

  const { nodes, edges } = useStore(selector, shallow);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async () => {
    // Validation
    if (nodes.length === 0) {
      showToast(
        <div>
          <p className="font-medium mb-1">Pipeline is empty</p>
          <p className="text-xs text-slate-500">
            Please add nodes to your pipeline before running
          </p>
        </div>,
        "error"
      );
      return;
    }

    const pipelineData = {
      nodes: nodes,
      edges: edges,
    };

    try {
      const formData = new FormData();
      formData.append("pipeline", JSON.stringify(pipelineData));

      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const dagStatus = result.is_dag ? "Valid DAG" : "Not a DAG";
      const dagIcon = result.is_dag ? "✓" : "✗";

      showToast(
        <div>
          <p className="font-medium mb-2">Pipeline analyzed successfully</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between py-1 px-2 bg-slate-50 rounded">
              <span className="text-slate-600">Nodes</span>
              <span className="spaceGroteskMedium text-slate-800">
                {result.num_nodes}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 px-2 bg-slate-50 rounded">
              <span className="text-slate-600">Edges</span>
              <span className="spaceGroteskMedium text-slate-800">
                {result.num_edges}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 px-2 bg-slate-50 rounded">
              <span className="text-slate-600">DAG Status</span>
              <span
                className={`spaceGroteskMedium ${
                  result.is_dag ? "text-green-600" : "text-orange-600"
                }`}
              >
                {dagIcon} {dagStatus}
              </span>
            </div>
          </div>
        </div>,
        "success"
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      showToast(
        <div>
          <p className="font-medium mb-1">Failed to submit pipeline</p>
          <p className="text-xs text-slate-500 mb-2">{error.message}</p>
          <div className="text-xs text-slate-400 space-y-0.5">
            <p>• Check if backend is running on port 8000</p>
            <p>• Verify network connection</p>
          </div>
        </div>,
        "error"
      );
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <div className="relative">
          <button
            type="submit"
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white spaceGroteskMedium text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Run Pipeline"
          >
            <div className="flex items-center gap-2">
              <HiPlay className="w-4 h-4 transition-transform duration-200" />
              <span>Run</span>
            </div>
          </button>

          <div
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 ease-out ${
              isHovered
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            <div className="relative">
              <div className="px-3 py-1.5 bg-slate-800 text-white rounded-md shadow-xl whitespace-nowrap">
                <span className="openSansRegular text-xs">Run Pipeline</span>
              </div>

              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}
    </>
  );
};