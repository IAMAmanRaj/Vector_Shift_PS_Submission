import { memo, useState, useEffect, useCallback } from "react";
import { useStore } from "../store";
import { Handle, Position } from "reactflow";
import {
  buildInitialState as initialData,
  resolveHandleId,
  renderField,
} from "../utils/base-node-helpers";

const Base = memo(({ nodeConfig, id, data }) => {
  const {
    title = "Node",
    accentColor,
    badge,
    description,
    fields = [],
    handles = [],
    style,
  } = nodeConfig;

  const updateNodeField = useStore((state) => state.updateNodeField);

  const [values, setValues] = useState(() => initialData(fields, { id, data }));

  useEffect(() => {
    setValues((previousValues) => {
      let hasUpdates = false;
      const nextValues = { ...previousValues };

      fields.forEach((field) => {
        if (!field.key) return;

        const incomingValue = data?.[field.key];
        if (
          incomingValue !== undefined &&
          incomingValue !== previousValues[field.key]
        ) {
          nextValues[field.key] = incomingValue;
          hasUpdates = true;
        }
      });

      return hasUpdates ? nextValues : previousValues;
    });
  }, [data, fields]);

  useEffect(() => {
    fields.forEach((field) => {
      if (!field.key) return;

      if (data?.[field.key] === undefined) {
        const currentValue = values[field.key];
        if (currentValue !== undefined) {
          updateNodeField(id, field.key, currentValue);
        }
      }
    });
  }, [data, fields, id, updateNodeField, values]);

  const handleFieldChange = useCallback(
    (field, nextValue) => {
      if (!field.key) return;

      setValues((previousValues) => ({
        ...previousValues,
        [field.key]: nextValue,
      }));

      updateNodeField(id, field.key, nextValue);
    },
    [id, updateNodeField]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[280px] max-w-[400px]">
      {handles
        .filter((handle) => handle.position === Position.Left)
        .map((handle) => (
          <Handle
            key={`${handle.type}-${resolveHandleId(handle, id)}-left`}
            type={handle.type}
            position={Position.Left}
            id={resolveHandleId(handle, id)}
            style={handle.style}
          />
        ))}

      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="font-semibold text-lg" style={{ color: accentColor }}>
          {title}
        </span>

        {badge && (
          <span
            className="px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: accentColor }}
          >
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100 break-words">
          {description}
        </p>
      )}

      <div className="p-4 space-y-4">
        {fields.map((field) => {
          const value = values[field.key];
          const onChange = (nextValue) => handleFieldChange(field, nextValue);
          const { label, helperText } = field;

          return (
            <div key={field.key} className="space-y-1.5">
              {label && (
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
              )}
              {renderField(field, value, onChange)}
              {helperText && (
                <small className="block text-xs text-gray-500 mt-1">
                  {helperText}
                </small>
              )}
            </div>
          );
        })}
      </div>

      {handles
        .filter((handle) => handle.position === Position.Right)
        .map((handle) => (
          <Handle
            key={`${handle.type}-${resolveHandleId(handle, id)}-right`}
            type={handle.type}
            position={Position.Right}
            id={resolveHandleId(handle, id)}
            style={handle.style}
          />
        ))}
    </div>
  );
});

Base.displayName = "BaseNode";

export const createNode = (config = {}) => {
  return function NodeComponent(props) {
    return <Base {...props} nodeConfig={config} />;
  };
};
