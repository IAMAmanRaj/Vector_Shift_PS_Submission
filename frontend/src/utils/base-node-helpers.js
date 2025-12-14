import { useStore } from "../store";

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

export const resolveHandleId = (handleConfig, nodeId) => {
  const { idSuffix } = handleConfig;
  if (idSuffix) {
    return `${nodeId}-${idSuffix}`;
  }
  return nodeId;
};

export const renderField = (field, value, onChange) => {
  const { inputType = "text", options, inputProps } = field;

  if (inputType === "select") {
    return (
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
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
        {...inputProps}
      />
    );
  }

  if (inputType === "checkbox") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
        {...inputProps}
      />
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
        {...inputProps}
      />
    );
  }

  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      {...inputProps}
    />
  );
};

export const getNextIndexedName = (NEW_PREFIX) => {
  const nodes = useStore.getState().nodes;

  const usedIndexes = nodes
    .map((node) => {
      const values = Object.values(node.data || {});
      const matched = values.find(
        (value) =>
          typeof value === "string" && value.startsWith(NEW_PREFIX)
      );

      if (!matched) return null;

      const index = Number(matched.replace(NEW_PREFIX, ""));
      return Number.isNaN(index) ? null : index;
    })
    .filter((index) => index !== null);

  let nextIndex = 0;
  while (usedIndexes.includes(nextIndex)) {
    nextIndex += 1;
  }

  return `${NEW_PREFIX}${nextIndex}`;
};

