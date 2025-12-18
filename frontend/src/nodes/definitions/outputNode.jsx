import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode.jsx";
import { NODE_ACCENTS } from "../../constants/NodeConstants";
import { OUTPUT_NAME_PREFIX } from "../../constants/NodeConstants";
import { getNextIndexedName } from "../utils/base-node-helpers";

export const OutputNode = create({
  title: "Output",
  badge: "Sink",
  description: "Pass data out of your pipeline",
  accentColor: NODE_ACCENTS.OUTPUT,
  fields: [
    {
      key: "outputName",
      label: "Output",
      inputType: "text",
      defaultValue: ({ id, data }) =>
        data?.outputName || getNextIndexedName(OUTPUT_NAME_PREFIX),
      helperText: "Readable label for this pipeline output.",
    },
    {
      key: "outputType",
      label: "Format",
      inputType: "select",
      defaultValue: ({ data }) => data?.outputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "Image", value: "Image" },
        { label: "JSON", value: "JSON" },
      ],
    },
    {
      key: "isPrimary",
      label: "Mark as primary",
      inputType: "checkbox",
      defaultValue: ({ data }) => Boolean(data?.isPrimary),
      helperText: "Primary outputs surface first in API responses.",
    },
  ],

  handles: [
    {
      type: "target",
      position: Position.Left,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
});
