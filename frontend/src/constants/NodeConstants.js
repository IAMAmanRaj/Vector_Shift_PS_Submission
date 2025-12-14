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
