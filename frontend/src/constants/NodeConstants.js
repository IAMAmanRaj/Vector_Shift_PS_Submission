/**
 * This file defines prefixes used across the application for custom node types
 * (used in toolbar) and internal ID generation (used in node creation logic).
 */

export const NODE_TYPES = {
  // This is for the 'type' property passed to the DraggableNode component
  INPUT: "customInput",
  LLM: "llm",
  OUTPUT: "customOutput",
  TEXT: "text",
};

export const NODE_LABELS = {
  // for the 'label' property passed to the DraggableNode component
  INPUT: "Input",
  LLM: "LLM",
  OUTPUT: "Output",
  TEXT: "Text",
};

// This is for Internal ID Handling (For defaultValue logic when there's no initial data coming from reactflow render)
export const INPUT_NAME_PREFIX = "input_";

export const OUTPUT_NAME_PREFIX = "output_";
