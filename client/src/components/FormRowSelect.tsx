import React, { type ComponentPropsWithoutRef, type FC } from "react";
type SelectProp = {
  name: string;
  labelText?: string;
  list: Record<string, string>;
} & ComponentPropsWithoutRef<"select">;

const FormRowSelect: FC<SelectProp> = ({ name, labelText, list, ...props }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} id={name} className="form-select" {...props}>
        {Object.values(list).map((itemsValue) => (
          <option key={itemsValue} value={itemsValue}>
            {itemsValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
