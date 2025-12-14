import { Position } from 'reactflow';
import { createNode as create } from "./../BaseNode";
import { NODE_ACCENTS } from "../../constants/theme";

export const CollectorNode = create({
  title: 'Collector',
  badge: 'Buffer',
  description: 'Aggregate multiple events into batches.',
   accentColor: NODE_ACCENTS.COLLECTOR,
  style: {
    background:
      'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(255,255,255,0.95) 100%)',
  },
  fields: [
    {
      key: 'strategy',
      label: 'Strategy',
      inputType: 'select',
      defaultValue: ({ data }) => data?.strategy || 'count',
      options: [
        { label: 'Count window', value: 'count' },
        { label: 'Time window', value: 'time' },
        { label: 'Until condition', value: 'condition' },
      ],
      helperText: 'Choose when to flush collected items.',
    },
    {
      key: 'windowSize',
      label: 'Window size',
      inputType: 'number',
      defaultValue: ({ data }) =>
        data?.windowSize !== undefined ? data.windowSize : 10,
      inputProps: { min: 1 },
    },
    {
      key: 'dedupeKey',
      label: 'Deduplicate by field',
      inputType: 'text',
      defaultValue: ({ data }) => data?.dedupeKey || '',
      helperText: 'Optional: removes items with the same field value.',
    },
  ],
  footer: ({ values }) => (
    <div
      style={{
        marginTop: 6,
        padding: '6px 8px',
        borderRadius: 8,
        background: 'rgba(20,184,166,0.14)',
        color: '#0F766E',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {values.strategy === 'count'
        ? `Flush every ${values.windowSize || 0} items`
        : values.strategy === 'time'
        ? `Flush on interval of ${values.windowSize || 0} ${values.windowSize === 1 ? 'minute' : 'minutes'}`
        : 'Flush when custom condition resolves to true'}
    </div>
  ),
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'input',
      style: { top: '45%' },
    },
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'control',
      style: { top: '75%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'batch',
      style: { top: '50%' },
    },
  ],
});