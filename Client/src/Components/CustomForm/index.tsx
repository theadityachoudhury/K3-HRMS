// import React, { useEffect } from 'react';
// import classNames from 'classnames';

// interface FormField {
//   label: string;
//   name: string;
//   type: string;
//   placeholder?: string;
//   options?: string[]; // For select fields
//   disabled?: boolean;
//   size: 'lg' | 'md' | 'sm' | 'xs'; // Size prop to determine layout
// }

// interface CustomFormProps {
//   title: string;
//   fields: FormField[];
//   onSubmit: (data: Record<string, any>) => void;
//   onChange?: (data: Record<string, any>) => void; // New prop to handle form changes
//   initialValues?: Record<string, any>; // New prop for initial values
//   disabledAll?: boolean;
// }

// const sizeToClasses = {
//   lg: 'md:col-span-4 lg:col-span-4',
//   md: 'md:col-span-2 lg:col-span-2',
//   sm: 'md:col-span-1 lg:col-span-1',
//   xs: 'md:col-span-1 lg:col-span-1',
// };

// const CustomForm: React.FC<CustomFormProps> = ({ title, fields, onSubmit, onChange, initialValues = {}, disabledAll = false }) => {
//   const [formData, setFormData] = React.useState<Record<string, any>>(initialValues);

//   useEffect(() => {
//     setFormData(initialValues); // Set initial values when the component is mounted or when initialValues changes
//   }, [initialValues]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const updatedFormData = {
//       ...formData,
//       [e.target.name]: e.target.value,
//     };
//     setFormData(updatedFormData);

//     if (onChange) {
//       onChange(updatedFormData); // Call the onChange function with the updated form data
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div>
//       <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium mb-4">{title}</h2>
//       <form
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault();
//             handleSubmit(e);
//           }
//         }}
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4"
//       >
//         {fields.map((field) => (
//           <div
//             key={field.name}
//             className={classNames('flex flex-col', sizeToClasses[field.size], 'col-span-1')}
//           >
//             <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-700">
//               {field.label}
//             </label>
//             {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
//               <input
//                 id={field.name}
//                 name={field.name}
//                 type={field.type}
//                 value={formData[field.name] || ''}
//                 onChange={handleChange}
//                 disabled={disabledAll || field.disabled}
//                 className="p-2 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
//                 placeholder={field.placeholder}
//               />
//             ) : field.type === 'textarea' ? (
//               <textarea
//                 id={field.name}
//                 name={field.name}
//                 value={formData[field.name] || ''}
//                 onChange={handleChange}
//                 disabled={disabledAll || field.disabled}
//                 className="p-3 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
//                 placeholder={field.placeholder}
//               />
//             ) : field.type === 'select' && field.options ? (
//               <select
//                 id={field.name}
//                 name={field.name}
//                 value={formData[field.name] || ''}
//                 onChange={handleChange}
//                 disabled={disabledAll || field.disabled}
//                 className="p-3 w-full border border-black placeholder:text-slate-500 text-sm rounded-md"
//               >
//                 {field.options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             ) : null}
//           </div>
//         ))}
//         <div className="col-span-1 md:col-span-4 lg:col-span-4">
//           <button
//             type="submit"
//             disabled={disabledAll}
//             className={`p-2 w-full text-white rounded-md ${
//               disabledAll ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
//             }`}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CustomForm;

import React, { useEffect } from 'react';
import classNames from 'classnames';
import { XCircleIcon } from 'lucide-react'; // Assuming you're using Lucide Icons for a close button
import { z, ZodSchema } from 'zod';

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  options?: string[]; // For select, radio fields
  disabled?: boolean;
  size: 'lg' | 'md' | 'sm' | 'xs'; // Size prop to determine layout
  multiple?: boolean; // For checkboxes
}

interface CustomFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void; // New prop to handle form changes
  initialValues?: Record<string, any>; // New prop for initial values
  disabledAll?: boolean;
  validationSchema?: ZodSchema; // New prop for validation schema
}

const sizeToClasses = {
  lg: 'md:col-span-4 lg:col-span-4',
  md: 'md:col-span-2 lg:col-span-2',
  sm: 'md:col-span-1 lg:col-span-1',
  xs: 'md:col-span-1 lg:col-span-1',
};

const CustomForm: React.FC<CustomFormProps> = ({ title, fields, onSubmit, onChange, initialValues = {}, disabledAll = false, validationSchema }) => {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialValues);
  const [images, setImages] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialValues); // Set initial values when the component is mounted or when initialValues changes
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;

    if (e.target instanceof HTMLInputElement && (type === 'checkbox' || type === 'radio')) {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (e.target instanceof HTMLInputElement && type === 'file') {
      const files = e.target.files;
      if (files) {
        const newImages = Array.from(files);
        setImages((prev) => [...prev, ...newImages]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (onChange) {
      onChange(formData);
    }
  };

  const validateForm = () => {
    if (validationSchema) {
      const result = validationSchema.safeParse(formData);
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((error: any) => {
          if (error.path.length > 0) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
    }
    return true;
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
            {field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number' || field.type === 'tel' ? (
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
            ) : field.type === 'checkbox' ? (
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                checked={!!formData[field.name]}
                onChange={handleChange}
                disabled={disabledAll || field.disabled}
                className="h-5 w-5 text-blue-600"
              />
            ) : field.type === 'radio' && field.options ? (
              <div>
                {field.options.map((option) => (
                  <label key={option} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name={field.name}
                      value={option}
                      checked={formData[field.name] === option}
                      onChange={handleChange}
                      disabled={disabledAll || field.disabled}
                      className="h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            ) : field.type === 'file' ? (
              <div>
                <label htmlFor={field.name} className="p-3 cursor-pointer bg-blue-500 text-white text-sm font-medium rounded-md inline-flex items-center">
                  Upload Images
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    onChange={handleChange}
                    disabled={disabledAll || field.disabled}
                    className="hidden"
                    multiple={field.multiple}
                    accept="image/*"
                  />
                </label>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`upload-preview-${idx}`}
                        className="h-32 w-32 object-cover rounded-md shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-75 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">{errors[field.name]}</span>
            )}
          </div>
        ))}
        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <button
            type="submit"
            disabled={disabledAll}
            className={`p-2 w-full text-white rounded-md ${disabledAll ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
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

