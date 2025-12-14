import { useStore } from "../../store/store";

export const buildInitialState = (fields, { id, data }) => {
  return fields.reduce((acc, field) => {
    const { key, defaultValue } = field;
    if (!key) return acc;

    if (data?.[key] !== undefined) {
      acc[key] = data[key];
      return acc;
    }

    if (typeof defaultValue === "function") {
      acc[key] = defaultValue({ id, data });
      return acc;
    }

    acc[key] = defaultValue ?? "";
    return acc;
  }, {});
};

export const resolveHandleId = (handleConfig, context) => {
  const { idSuffix } = handleConfig;
  if (idSuffix) {
    return `${context.id}-${idSuffix}`;
  }
  return context.id;
};

export const renderField = (field, value, onChange) => {
  const { inputType = "text", options, inputProps } = field;

  const baseInputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const textareaClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none min-h-[80px]";
  const selectClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white";
  const checkboxClasses =
    "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer";

  if (inputType === "select") {
    return (
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={selectClasses}
        {...inputProps}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (inputType === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={textareaClasses}
        {...inputProps}
      />
    );
  }

  if (inputType === "checkbox") {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className={checkboxClasses}
          {...inputProps}
        />
      </div>
    );
  }

  if (inputType === "number") {
    return (
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue === "" ? "" : Number(nextValue));
        }}
        className={baseInputClasses}
        {...inputProps}
      />
    );
  }

  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      className={baseInputClasses}
      {...inputProps}
    />
  );
};

export const getNextIndexedName = (prefix) => {
  const nodes = useStore.getState().nodes;

  const usedIndexes = new Set();
  nodes.forEach((node) => {
    const dataValues = Object.values(node.data || {});
    for (const value of dataValues) {
      if (typeof value === "string" && value.startsWith(prefix)) {
        const index = Number(value.slice(prefix.length));
        if (!Number.isNaN(index)) {
          usedIndexes.add(index);
        }
      }
    }
  });

  let nextIndex = 0;
  while (usedIndexes.has(nextIndex)) {
    nextIndex += 1;
  }

  return `${prefix}${nextIndex}`;
};
