import {FieldValues} from "react-hook-form";

export const requiredValidation = {
    required: 'This field is required',
};

export const maxLengthValidation = (max: number) => ({
    maxLength: {
        value: max,
        message: `Must be less than ${max} characters`,
    },
});
export const lettersOnlyValidation = {
    pattern: {
        value: /^[A-Za-zА-Яа-яії ]+$/,
        message: 'Only letters are allowed',
    },
};
export const minValueValidation = (min: number) => ({
    validate: (value: number | string) => {
        const numericValue = parseFloat(value as string);
        return numericValue >= min || `Must be greater than or equal to ${min}`;
    },
});

export const dateValidation = {
    validate: (value: Date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);

        return selectedDate >= currentDate || 'Must be today or in the future';
    },
};

export const endDateValidation = {
    validate: (value: Date, { startDate }: FieldValues) =>
        value > startDate || 'Must be after the start date',
};

export const passwordValidation = {
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message:
            'Password must contain at least one uppercase letter, one digit, and be at least 8 characters long',
    },
};
export const repeatPasswordValidation = {
    validate: (value: string, { newPassword }: FieldValues) =>
        value === newPassword || 'Passwords do not match',
};

export const emailValidation = {
    pattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        message: 'Enter a valid email address',
    },
};
export const imageFileValidation = {
    validate: (file: FileList) => {
        if(!file[0] || file[0] === undefined)
            return true;
        console.log(file);
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileName = file[0].name.toLowerCase();
        const fileExtension = fileName.split('.').pop();

        if (fileExtension && !allowedExtensions.includes(fileExtension)) {
            return 'Only image files with extensions: jpg, jpeg, png are allowed';
        }
        return true;
    },
};

export const fileSizeValidation = (maxSizeInMB: number) => ({
    validate: (file: FileList) => {
        if (file) {
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
            const fileSize = file[0].size;

            if (fileSize > maxSizeInBytes) {
                return `File size must be less than ${maxSizeInMB} MB`;
            }

            return true;
        }
    }
});



