import { Position } from 'reactflow';
import { createNode as create } from "./../BaseNode.jsx";
import { NODE_ACCENTS } from "../../constants/NodeConstants";

export const DecisionNode = create({
  title: 'Branch',
  badge: 'Logic',
  description: 'Evaluate a condition and split the flow.',
   accentColor: NODE_ACCENTS.DECISION,
  fields: [
    {
      key: 'expression',
      label: 'Condition',
      inputType: 'textarea',
      defaultValue: ({ data }) =>
        data?.expression || '{{$input.score}} > 0.7',
      helperText: 'Use JavaScript-style expressions with pipeline variables.',
    },
    {
      key: 'fallback',
      label: 'Fallback value',
      inputType: 'text',
      defaultValue: ({ data }) => data?.fallback || 'false',
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'input',
      style: { top: '50%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'true',
      style: { top: '35%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'false',
      style: { top: '65%' },
    },
  ],
});