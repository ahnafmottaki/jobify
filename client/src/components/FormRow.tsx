import type { FC, InputHTMLAttributes } from "react";

type FormRowProps = {
  name: string;
  labelText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "required">;

const FormRow: FC<FormRowProps> = ({ name, labelText, ...props }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input id={name} name={name} className="form-input" required {...props} />
    </div>
  );
};

export default FormRow;
