import { useState } from "react";

export const SubmitButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative">
        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white spaceGroteskMedium text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          aria-label="Run Pipeline"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
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
  );
};
