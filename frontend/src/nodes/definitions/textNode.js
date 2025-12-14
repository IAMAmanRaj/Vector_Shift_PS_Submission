import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/NodeConstants";

export const TextNode = create({
  title: "Text",
  badge: "Utility",
  description: "Combine variables into a static or templated string.",
  accentColor: NODE_ACCENTS.TEXT,

  fields: [
    {
      key: "text",
      label: "Text",
      inputType: "textarea",
      defaultValue: ({ data }) => data?.text || "{{input}}",
    },
    {
      key: "trimWhitespace",
      label: "Trim whitespace",
      inputType: "checkbox",
      defaultValue: ({ data }) => Boolean(data?.trimWhitespace),
    },
  ],

  handles: [
    {
      type: "source",
      position: Position.Right,
      idSuffix: "output",
      label: "Output",
    },
  ],
});
