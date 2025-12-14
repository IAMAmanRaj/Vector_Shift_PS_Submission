import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/NodeConstants";

export const LLMNode = create({
  title: "LLM",
  badge: "Processor",
  description: "Utilize LLMs in your pipelines.",
  accentColor: NODE_ACCENTS.LLM,

  fields: [
    {
      key: "model",
      label: "Provider",
      inputType: "select",
      defaultValue: ({ data }) => data?.model || "gpt-4",
      options: [
        { label: "GPT-4", value: "gpt-4" },
        { label: "GPT-4o Mini", value: "gpt-4o-mini" },
        { label: "Claude 3 Haiku", value: "claude-3-haiku" },
      ],
    },
    {
      key: "prompt",
      label: "Prompt",
      inputType: "textarea",
      defaultValue: ({ data }) => data?.prompt || "",
      inputProps: {
        rows: 4,
      },
      helperText: "Higher values increase creativity. Range 0–1.",
    },
    {
      key: "maxTokens",
      label: "Max tokens",
      inputType: "number",
      defaultValue: ({ data }) => data?.maxTokens || 1024,
      inputProps: {
        min: 64,
        step: 64,
      },
    },
  ],

  handles: [
    {
      type: "target",
      position: Position.Left,
      idSuffix: "system",
      style: { top: "30%" },
    },
    {
      type: "target",
      position: Position.Left,
      idSuffix: "prompt",
      style: { top: "55%" },
    },
    {
      type: "source",
      position: Position.Right,
      idSuffix: "response",
      style: { top: "50%" },
    },
  ],
});
