import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/theme";
import { getNextIndexedName } from "../utils/base-node-helpers";

import { INPUT_NAME_PREFIX } from "../../constants/NodeConstants";

export const InputNode = create({
  title: "Input",
  badge: "Source",
  description: "Pass values of various data types into your pipeline",
  accentColor: NODE_ACCENTS.PRIMARY_BLUE,
  fields: [
    {
      key: "inputName",
      label: "Name",
      inputType: "text",
      defaultValue: ({ id, data }) =>
        data?.inputName || getNextIndexedName(INPUT_NAME_PREFIX),
      helperText: "Unique identifier surfaced to downstream nodes.",
    },
    {
      key: "inputType",
      label: "Type",
      inputType: "select",
      defaultValue: ({ data }) => data?.inputType || "Text",
      options: [
        { label: "Text", value: "Text" },
        { label: "File", value: "File" },
        { label: "Number", value: "Number" },
      ],
    },
  ],
  handles: [
    {
      type: "source",
      position: Position.Right,
      idSuffix: "value",
      style: { top: "50%" },
    },
  ],
});
