import { Position } from 'reactflow';
import { createNode as create } from "./../BaseNode.jsx";
import { NODE_ACCENTS } from "../../constants/NodeConstants";

export const HttpNode = create({
  title: 'HTTP Request',
  badge: 'Integration',
  description: 'Call external APIs and pass along structured responses.',
  accentColor: NODE_ACCENTS.HTTP,
  fields: [
    {
      key: 'method',
      label: 'Method',
      inputType: 'select',
      defaultValue: ({ data }) => data?.method || 'POST',
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
        { label: 'DELETE', value: 'DELETE' },
      ],
    },
    {
      key: 'url',
      label: 'URL',
      inputType: 'text',
      defaultValue: ({ data }) => data?.url || 'https://api.example.com',
      helperText: 'Accepts template variables like {{query}}.',
    },
    {
      key: 'headers',
      label: 'Headers (JSON)',
      inputType: 'textarea',
      defaultValue: ({ data }) =>
        data?.headers || '{\n  "Content-Type": "application/json"\n}',
    },
    {
      key: 'body',
      label: 'Body',
      inputType: 'textarea',
      defaultValue: ({ data }) => data?.body || '{ "message": "{{input}}" }',
    },
    {
      key: 'parseJson',
      label: 'Parse JSON response',
      inputType: 'checkbox',
      defaultValue: ({ data }) => data?.parseJson ?? true,
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'input',
      style: { top: '35%' },
    },
    {
      type: 'target',
      position: Position.Left,
      idSuffix: 'auth',
      style: { top: '65%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'response',
      style: { top: '40%' },
    },
    {
      type: 'source',
      position: Position.Right,
      idSuffix: 'status',
      style: { top: '70%' },
    },
  ],
});