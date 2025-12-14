export const NODE_CATEGORIES = {
  START: "Start",
  AI: "AI",
  INTEGRATIONS: "Integrations",
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
  },
};

// This is for Internal ID Handling (For defaultValue logic when there's no initial data coming from reactflow render)
export const INPUT_NAME_PREFIX = "input_";

export const OUTPUT_NAME_PREFIX = "output_";
