import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/definitions/inputNode";
import { LLMNode } from "./nodes/definitions/llmNode";
import { OutputNode } from "./nodes/definitions/outputNode";
import { TextNode } from "./nodes/definitions/textNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="spaceGroteskBold text-base text-slate-800 leading-none">
              Pipeline Editor
            </h1>
            <p className="openSansRegular text-xs text-slate-500 mt-0.5">
              Build your workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                nodes.length > 0 ? "bg-green-500" : "bg-slate-300"
              }`}
            ></div>
            <span className="openSansRegular text-xs text-slate-700">
              {nodes.length} {nodes.length === 1 ? "node" : "nodes"}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <svg
              className="w-3.5 h-3.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="openSansRegular text-xs text-slate-700">
              {edges.length} {edges.length === 1 ? "connection" : "connections"}
            </span>
          </div>
        </div>
      </div>

      <div ref={reactFlowWrapper} className="flex-1 relative">
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center animate-fadeIn">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="spaceGroteskBold text-lg text-slate-700 mb-1.5">
                Start Building
              </h3>
              <p className="openSansRegular text-sm text-slate-500 max-w-sm mx-auto">
                Drag nodes from the sidebar to create your pipeline
              </p>
            </div>
          </div>
        )}

        <ReactFlow
          className="rf-edge-hover"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          }}
          fitView
          fitViewOptions={{
            padding: 0.2,
            minZoom: 0.6,
            maxZoom: 0.8,
          }}
        >
          <Background
            color="#cbd5e1"
            gap={gridSize}
            size={1}
            className="bg-slate-50"
          />
          <Controls
            className="!bg-white !border !border-slate-200 !rounded-lg !shadow-md transition-all duration-200 !left-4 !bottom-4"
            showInteractive={false}
          />
          <MiniMap
            className="!bg-white !border !border-slate-200 !rounded-lg !shadow-md !right-4 !bottom-20"
            maskColor="rgba(248, 250, 252, 0.85)"
            nodeColor={(node) => {
              if (node.type === "customInput") return "#0EA5E9";
              if (node.type === "customOutput") return "#10B981";
              if (node.type === "llm") return "#8B5CF6";
              return "#94a3b8";
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>
    </div>
  );
};
