import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap} from "reactflow";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { InputNode } from "../nodes/definitions/inputNode.jsx";
import { LLMNode } from "../nodes/definitions/llmNode.jsx";
import { OutputNode } from "../nodes/definitions/outputNode.jsx";
import { TextNode } from "../nodes/definitions/textNode.jsx";
import { DelayNode } from "../nodes/definitions/delayNode.jsx";
import { HttpNode } from "../nodes/definitions/httpNode.jsx";
import { DecisionNode } from "../nodes/definitions/decisionNode.jsx";
import { MathNode } from "../nodes/definitions/mathNode.jsx";
import { CollectorNode } from "../nodes/definitions/collectorNode.jsx";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaLinode } from "react-icons/fa";
import { TfiLink } from "react-icons/tfi";

import "reactflow/dist/style.css";
import { edgeTypes } from "../components/customEdge.jsx";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  delay: DelayNode,
  http: HttpNode,
  decision: DecisionNode,
  math: MathNode,
  collector: CollectorNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  theme: state.theme,
  setTheme: state.setTheme,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isInteractive, setIsInteractive] = useState(true);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    theme,
    setTheme,
  } = useStore(selector, shallow);

  const colorMode = theme === 'black' ? 'dark' : 'light';

  const onToggle = () => {
    setTheme(theme === 'black' ? 'white' : 'black');
  };

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
    <div className="h-screen flex flex-col bg-bg" data-theme={colorMode}>
      <div className="h-[75px] bg-panel border-b border-border flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-3 w-full pl-12">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-6 h-6 text-white"
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
            <h1 className="spaceGroteskBold text-xl text-text leading-none">
              Pipeline Editor
            </h1>
            <p className="openSansRegular text-md text-muted mt-0.5">
              Build your workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-panel rounded-lg border border-border">
            <div
             
            >
              <FaRegCircleDot className={`w-3 h-3 rounded-full transition-all duration-300 ${
                nodes.length > 0 ? "text-green-500" : "text-slate-400"
              }`}/>
            </div>
            <span className="openSansRegular text-xs text-text">
              {nodes.length} {nodes.length === 1 ? "node" : "nodes"}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-[6px] bg-panel rounded-lg border border-border">
           <TfiLink className="w-6 h-6 text-muted transition-all duration-300"/>
            <span className="openSansRegular text-xs text-text">
              {edges.length} {edges.length === 1 ? "connection" : "connections"}
            </span>
          </div>

          <button
            onClick={onToggle}
            className="flex flex-col items-center gap-1 px-4 py-2 bg-panel rounded-lg border border-border hover:bg-opacity-80 transition-all duration-200 active:scale-95"
            title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            data-theme-toggle
          >
            {colorMode === "light" ? (
              <FiSun size={16} className="text-text"/>
            ) : (
             <FiMoon size={16} className="text-text" />
            )}
            <span className="openSansRegular text-xs text-text">
              {colorMode === "light" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </div>

      <div ref={reactFlowWrapper} className="flex-1 relative">
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center animate-fadeIn">
              <div className="mx-auto mb-4 rounded-xl flex items-center justify-center ">
                <FaLinode className="text-muted w-32 h-32 "/>
              </div>
              <h3 className="spaceGroteskBold text-lg text-text mb-1.5">
                Start Building
              </h3>
              <p className="openSansRegular text-sm text-muted max-w-sm mx-auto">
                Drag nodes from the sidebar to create your pipeline
              </p>
            </div>
          </div>
        )}

        <ReactFlow
          className="rf-edge-hover"
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
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
          colorMode={colorMode}
          fitView
          fitViewOptions={{
            padding: 0.2,
            minZoom: 0.6,
            maxZoom: 0.8,
          }}
          zoomOnScroll={isInteractive}
  panOnScroll={isInteractive}
  panOnDrag={isInteractive}
        >
          <Background
            color={colorMode === "dark" ? "#334155" : "#cbd5e1"}
            gap={gridSize}
            size={1}
          />
          <Controls
            className="flex flex-row"
            showInteractive={true}
            position="bottom-center"
            onInteractiveChange={setIsInteractive}
            style={
              {
                border: colorMode === "dark" ? "1px solid #44403c" : "1px solid #e2e8f0",
                boxShadow: colorMode === "dark" ? "0 24px 12px rgba(0, 0, 0, 0.1)" : "0 24px 12px rgba(0, 0, 0, 0.1)",
 }
            }
            aria-label="React Flow Controls"
          />
          <MiniMap
            className="!rounded-lg !shadow-md !right-4 !bottom-20 react-flow__minimap"
            maskColor={colorMode === "dark" ? "#292323" : "#E8E8E8"}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>
    </div>
  );
};