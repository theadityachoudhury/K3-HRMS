import React, { useEffect } from 'react';
import classNames from 'classnames';

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: string[]; // For select fields
  disabled?: boolean;
  size: 'lg' | 'md' | 'sm' | 'xs'; // Size prop to determine layout
}

interface CustomFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void; // New prop to handle form changes
  initialValues?: Record<string, any>; // New prop for initial values
  disabledAll?: boolean;
}

const sizeToClasses = {
  lg: 'md:col-span-4 lg:col-span-4',
  md: 'md:col-span-2 lg:col-span-2',
  sm: 'md:col-span-1 lg:col-span-1',
  xs: 'md:col-span-1 lg:col-span-1',
};

const CustomForm: React.FC<CustomFormProps> = ({ title, fields, onSubmit, onChange, initialValues = {}, disabledAll = false }) => {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setFormData(initialValues); // Set initial values when the component is mounted or when initialValues changes
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedFormData);

    if (onChange) {
      onChange(updatedFormData); // Call the onChange function with the updated form data
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium mb-4">{title}</h2>
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4"
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={classNames('flex flex-col', sizeToClasses[field.size], 'col-span-1')}
          >
            <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={disabledAll || field.disabled}
                className="p-2 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
                placeholder={field.placeholder}
              />
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={disabledAll || field.disabled}
                className="p-3 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
                placeholder={field.placeholder}
              />
            ) : field.type === 'select' && field.options ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={disabledAll || field.disabled}
                className="p-3 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <button
            type="submit"
            disabled={disabledAll}
            className={`p-2 w-full text-white rounded-md ${
              disabledAll ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;

