import { Position } from "reactflow";
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/NodeConstants";
import { textareaStyle } from "../../constants/NodeConstants";

export const TextNode = create({
  title: "Text",
  badge: "Utility",
  description: "Combine variables into a static or templated string.",
  accentColor: NODE_ACCENTS.TEXT,
  style: ({ values }) => {
    const text = values?.text || '';
    const lines = text.split('\n');
    const longest = Math.max(0, ...lines.map((l) => l.length));
    const baseWidth = 260;
    const extraWidth = Math.min(Math.max(0, longest - 40) * 4, 220);
    const width = baseWidth + extraWidth;
    const baseHeight = 140;
    const extraLines = Math.max(0, lines.length - 4);
    const minHeight = baseHeight + extraLines * 18;
    return { width, minHeight };
  },

    fields: [
    {
      key: 'text',
      label: 'Template',
      inputType: 'textarea',
      defaultValue: ({ data }) => data?.text || '{{input}}',
      helperText: 'Supports moustache-style variables, e.g. {{input}}.',
      render: ({ value, onChange }) => {
        const text = value || '';
        const lines = text.split('\n').length;
        const rows = Math.max(4, Math.min(lines, 20));
        const style = { ...textareaStyle, minHeight: rows * 18, resize: 'none' };
        return (
          <textarea
            style={style}
            value={text}
            onChange={(event) => onChange(event.target.value)}
          />
        );
      },
    },
    {
      key: 'trimWhitespace',
      label: 'Trim whitespace',
      inputType: 'checkbox',
      defaultValue: ({ data }) => Boolean(data?.trimWhitespace),
    },
  ],
    handles: ({ values }) => {
    const text = values?.text || '';
    const names = Array.from(new Set(Array.from(text.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)).map((m) => m[1])));
    const count = names.length;
    const leftHandles = names.map((name, i) => {
      const top = count <= 1 ? '50%' : `${30 + (i * (40 / (count - 1)))}%`;
      return {
        type: 'target',
        position: Position.Left,
        idSuffix: name,
        style: { top },
      };
    });
    return [
      ...leftHandles,
      {
        type: 'source',
        position: Position.Right,
        idSuffix: 'output',
        style: { top: '50%' },
      },
    ];
  },
});
