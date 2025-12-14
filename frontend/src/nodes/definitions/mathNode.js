import { Position } from 'reactflow';
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/theme";

export const MathNode = create({
  title: 'Math',
  badge: 'Transform',
  description: 'Perform basic numeric operations on inputs.',
  accentColor: NODE_ACCENTS.MATH,
  fields: [
    {
      key: 'operation',
      label: 'Operation',
      inputType: 'select',
      defaultValue: ({ data }) => data?.operation || 'add',
      options: [
        { label: 'Add', value: 'add' },
        { label: 'Subtract', value: 'subtract' },
        { label: 'Multiply', value: 'multiply' },
        { label: 'Divide', value: 'divide' },
      ],
    },
    {
      key: 'operand',
      label: 'Operand',
      inputType: 'number',
      defaultValue: ({ data }) =>
        data?.operand !== undefined ? data.operand : 1,
      inputProps: {
        step: 0.5,
      },
    },
    {
      key: 'roundResult',
      label: 'Round result',
      inputType: 'checkbox',
      defaultValue: ({ data }) => Boolean(data?.roundResult),
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'primary',
      style: { top: '40%' },
    },
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'secondary',
      style: { top: '70%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'result',
      style: { top: '50%' },
    },
  ],
});