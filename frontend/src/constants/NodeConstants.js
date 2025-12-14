export const NODE_CATEGORIES = {
  START: "Start",
  AI: "AI",
  INTEGRATIONS: "Integrations",
  LOGIC: "Logic",
  PROCESSING: "Processing",
};

export const NODE_TYPES = {
  // This is for the 'type' property passed to the DraggableNode component

  START: {
    INPUT: "customInput",
    OUTPUT: "customOutput",
  },

  AI: {
    LLM: "llm",
  },

  INTEGRATIONS: {
    TEXT: "text",
    HTTP: "http",
  },

  LOGIC: {
    DECISION: "decision",
  },

  PROCESSING: {
    MATH: "math",
    DELAY: "delay",
    COLLECTOR: "collector",
  },
};

export const NODE_LABELS = {
  // for the 'label' property passed to the DraggableNode component
  START: {
    INPUT: "Input",
    OUTPUT: "Output",
  },

  AI: {
    LLM: "LLM",
  },

  INTEGRATIONS: {
    TEXT: "Text",
    HTTP: "HTTP",
  },

  LOGIC: {
    DECISION: "Decision",
  },

  PROCESSING: {
    MATH: "Math",
    DELAY: "Delay",
    COLLECTOR: "Collector",
  },
};

// This is for Internal ID Handling (For defaultValue logic when there's no initial data coming from reactflow render)
export const INPUT_NAME_PREFIX = "input_";

export const OUTPUT_NAME_PREFIX = "output_";

export const COLORS = {
  BLUE: "#0EA5E9",
  GREEN: "#10B981",
  PURPLE: "#8B5CF6",
  YELLOW: "#FBBF24",
  ORANGE: "#F97316",
  RED: "#EF4444",
  CYAN: "#06B6D4",
  PINK: "#EC4899",
  SLATE: "#64748B",
};

export const NODE_ACCENTS = {
  INPUT: COLORS.BLUE,
  OUTPUT: COLORS.RED,
  LLM: COLORS.PURPLE,
  TEXT: COLORS.GREEN,
  HTTP: COLORS.CYAN,
  DECISION: COLORS.PINK,
  MATH: COLORS.YELLOW,
  DELAY: COLORS.ORANGE,
  COLLECTOR: COLORS.SLATE,
};

export const inputBaseStyle = {
  borderRadius: 8,
  border: "1px solid #CBD5F5",
  padding: "6px 8px",
  fontSize: 12,
  lineHeight: 1.4,
  color: "#0F172A",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  background: "#F8FAFC",
};

export const textareaStyle = {
  ...inputBaseStyle,
  minHeight: 64,
  resize: "vertical",
};

export const defaultHandleStyle = {
  width: 10,
  height: 10,
  backgroundColor: "#5B8DEF",
  border: `2px solid #0B1220`,
  boxShadow: "0 0 8px rgba(96,165,250,0.45)",
};

export const baseContainerStyle = {
  width: 260,
  minHeight: 140,
  borderRadius: 14,
  border: `1px solid #EFF6FF`,
  background: 'linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
  padding: '12px 14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: '#0F172A',
};