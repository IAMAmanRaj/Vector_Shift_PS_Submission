import { useState, useRef, useEffect } from "react";
import { DraggableNode } from "../draggableNode";
import { NODE_TYPES, NODE_LABELS } from "../constants/NodeConstants";
import {
  HiViewGrid,
  HiChevronLeft,
  HiSearch,
  HiX,
  HiMenu,
} from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";

const SEARCH_PLACEHOLDERS = [
  "Search nodes...",
  "Try 'Input' or 'Output'...",
  "Find 'LLM'...",
  "Search by category...",
];

export const PipelineToolbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getAllNodes = () => {
    const allNodes = [];
    Object.entries(NODE_TYPES).forEach(([category, nodes]) => {
      Object.entries(nodes).forEach(([key, type]) => {
        allNodes.push({
          type,
          label: NODE_LABELS[category][key],
          category,
          key,
        });
      });
    });
    return allNodes;
  };

  const filterNodes = () => {
    if (!searchQuery.trim()) return getAllNodes();

    const query = searchQuery.toLowerCase();
    const allNodes = getAllNodes();

    return allNodes.filter((node) => {
      const labelMatch = node.label.toLowerCase().includes(query);
      const categoryMatch = node.category.toLowerCase().includes(query);
      const keyMatch = node.key.toLowerCase().includes(query);
      return labelMatch || categoryMatch || keyMatch;
    });
  };

  const filteredNodes = filterNodes();
  const groupedNodes = filteredNodes.reduce((acc, node) => {
    if (!acc[node.category]) acc[node.category] = [];
    acc[node.category].push(node);
    return acc;
  }, {});

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? "60px" : "280px" }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 hover:scale-110 active:scale-95 transition-all duration-200 z-10"
        aria-label={isCollapsed ? "Expand toolbar" : "Collapse toolbar"}
      >
        <HiChevronLeft
          className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      {!isCollapsed && (
        <div className="h-full flex flex-col">
          <div className="px-4 py-5 border-b border-slate-200 opacity-0 animate-[fadeIn_0.3s_ease-out_0.1s_forwards]">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-3">
                <HiViewGrid className="w-4 h-4 text-white" />
              </div>
              <h2 className="spaceGroteskBold text-lg text-slate-800">Nodes</h2>
            </div>
            <p className="openSansRegular text-xs text-slate-500 pl-10">
              Drag to add to canvas
            </p>
          </div>

          <div className="px-4 pt-4 pb-3 border-b border-slate-100 opacity-0 animate-[fadeIn_0.3s_ease-out_0.15s_forwards]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch
                  className={`w-4 h-4 transition-all duration-300 ${
                    isSearchFocused
                      ? "text-blue-500 scale-110"
                      : "text-slate-400"
                  }`}
                />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
                className="w-full pl-9 pr-9 py-2 openSansRegular text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 opacity-0 animate-[fadeIn_0.3s_ease-out_0.2s_forwards]">
            {Object.entries(groupedNodes).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <BiSearchAlt className="w-7 h-7 text-slate-400" />
                </div>
                <p className="openSansMedium text-sm text-slate-600 mb-1">
                  No nodes found
                </p>
                <p className="openSansRegular text-xs text-slate-400">
                  Try a different search
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {Object.entries(groupedNodes).map(
                  ([category, nodes], categoryIndex) => (
                    <div
                      key={category}
                      className="opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
                      style={{ animationDelay: `${50 + categoryIndex * 60}ms` }}
                    >
                      <h3 className="spaceGroteskMedium text-xs uppercase tracking-wide text-slate-500 mb-2.5 px-1">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {nodes.map((node, nodeIndex) => (
                          <div
                            key={node.type}
                            className="opacity-0 animate-[fadeInUp_0.3s_ease-out_forwards]"
                            style={{
                              animationDelay: `${
                                100 + categoryIndex * 60 + nodeIndex * 40
                              }ms`,
                            }}
                          >
                            <DraggableNode
                              type={node.type}
                              label={node.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="h-full flex flex-col items-center pt-6 gap-4">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-200"
            aria-label="Expand toolbar"
          >
            <HiMenu className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}
    </div>
  );
};
