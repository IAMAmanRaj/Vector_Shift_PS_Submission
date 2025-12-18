// draggableNode.js

import { useState } from "react";

const getNodeIcon = (type) => {
  if (type.includes("Input") || type.includes("input")) {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    );
  }
  if (type.includes("Output") || type.includes("output")) {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    );
  }
  if (type.includes("llm") || type.includes("LLM")) {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
};

const getNodeColor = (type) => {
  if (type.includes("Input") || type.includes("input")) return "blue";
  if (type.includes("Output") || type.includes("output")) return "green";
  if (type.includes("llm") || type.includes("LLM")) return "purple";
  return "slate";
};

export const DraggableNode = ({ type, label }) => {
  const [isDragging, setIsDragging] = useState(false);
  const color = getNodeColor(type);

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      hoverBorder: "group-hover:border-blue-400",
      hoverBg: "group-hover:bg-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverIconBg: "group-hover:bg-blue-200",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      hoverBorder: "group-hover:border-green-400",
      hoverBg: "group-hover:bg-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      hoverIconBg: "group-hover:bg-green-200",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      hoverBorder: "group-hover:border-purple-400",
      hoverBg: "group-hover:bg-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverIconBg: "group-hover:bg-purple-200",
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      hoverBorder: "group-hover:border-slate-400",
      hoverBg: "group-hover:bg-slate-100",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      hoverIconBg: "group-hover:bg-slate-200",
    },
  };

  const colors = colorClasses[color];

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`group relative w-full px-3 py-2.5 ${colors.bg} border ${
        colors.border
      } ${colors.hoverBorder} ${
        colors.hoverBg
      } rounded-lg openSansRegular text-sm text-slate-800 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 ${
        isDragging ? "opacity-0" : ""
      }`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 rounded-md ${colors.iconBg} ${colors.hoverIconBg} flex items-center justify-center transition-all duration-200 flex-shrink-0`}
        >
          <div className={`${colors.iconColor} transition-colors duration-200`}>
            {getNodeIcon(type)}
          </div>
        </div>
        <span className="flex-1 font-medium text-slate-700">{label}</span>
        <svg
          className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-500 transition-colors duration-200 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
