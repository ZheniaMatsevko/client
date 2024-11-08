import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    RegisterOptions,
} from 'react-hook-form';
import React, {CSSProperties} from 'react';

export interface InputProps {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    isTextArea?: boolean;
    minValue?: number;
    validationOptions?: RegisterOptions;
    style?: CSSProperties;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
                                         id,
                                         label,
                                         type = 'text',
                                         placeholder,
                                         register,
                                         required,
                                         errors,
                                         isTextArea ,
                                         validationOptions,
                                         style,
                                         disabled
                                     }) => {
    const inputClasses = `form-control ${errors[id] ? 'is-invalid' : ''}`;

    return (
        <div className="mb-3 form-floating" style={style}>
            {isTextArea ? (
                <textarea
                    id={id}
                    style={{ height: '120px', ...style }}
                    {...register(id, { required, ...validationOptions })}
                    placeholder={placeholder}
                    className={inputClasses}
                    rows={8}
                    disabled={disabled}
                />
            ) : (
                <input type={type}
                       className={inputClasses}
                       id={id}
                       placeholder={placeholder}
                       disabled={disabled}
                       {...register(id, {required, ...validationOptions})}/>
            )}

            <label htmlFor={id}>{label}</label>
            {errors[id] && (
                <p className="text-danger text-sm mt-1">{errors[id]?.message?.toString()}</p>
            )}
        </div>
    );
};

export default Input;
