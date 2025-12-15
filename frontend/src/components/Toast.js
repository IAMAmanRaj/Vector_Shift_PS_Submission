import { useEffect, useState, useCallback } from "react";
import { HiX, HiCheckCircle, HiXCircle } from "react-icons/hi";

export const Toast = ({
  message,
  type = "success",
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  }, [onClose]);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Progress bar countdown
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 50);
        if (newProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newProgress;
      });
    }, 50);

    // Auto dismiss
    const timeout = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, handleClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`min-w-[320px] max-w-md bg-white rounded-lg shadow-2xl border-2 overflow-hidden ${
          isSuccess ? "border-green-500" : "border-red-500"
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <div className="flex-shrink-0 pt-0.5">
            {isSuccess ? (
              <HiCheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <HiXCircle className="w-6 h-6 text-red-500" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`spaceGroteskBold text-base mb-1 ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}
            >
              {isSuccess ? "Success!" : "Error"}
            </h3>
            <div className="openSansRegular text-sm text-slate-600 space-y-2">
              {message}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1 transition-colors duration-200"
            aria-label="Close notification"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100">
          <div
            className={`h-full transition-all duration-50 ease-linear ${
              isSuccess ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};