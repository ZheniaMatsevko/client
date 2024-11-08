import React, {useEffect} from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import {Modal} from "./Modal";
import Input from "../input/Input";
import UserService from "../../API/UserService";
import toast from "react-hot-toast";
import {Password, User} from "../../types/usersTypes";
import {passwordValidation, requiredValidation} from "../../utils/validationUtils";
interface ChangePasswordModalProps {
    isOpen:boolean;
    toggle: () => void;
}
export const ChangePasswordModal:React.FC<ChangePasswordModalProps> = ({isOpen, toggle}) => {
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User= storedUserString ? JSON.parse(storedUserString) : null;
    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        },
    });

    useEffect(() => {
        if (currentUser) {
            setValue('oldPassword', '');
            setValue('newPassword', '');
        }
    }, [currentUser, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const passwordData:Password = {
            id: currentUser.id,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        };
        UserService.changePassword(passwordData)
            .then((data) => {
                    toast.success("The password was changed successfully")
                    reset();
                    toggle();
                }
            )
            .catch((error) => {
                toast.error("Failed to change your password")
                reset();
                toggle();
                console.error('Error in creating your profile:', error);
            });
    }

    const bodyContent = (
        <div className="d-flex flex-column gap-4">
            <div className={'text-center'}>
                <div className="display-4 font-weight-bold">
                    Change password
                </div>
            </div>
            <Input
                id="oldPassword"
                label="Previous password"
                placeholder="Previous password"
                type="password"
                register={register}
                errors={errors}
                validationOptions={{
                    ...requiredValidation,
                }}

            />
            <Input
                id="newPassword"
                label="New password"
                placeholder="New password"
                type="password"
                register={register}
                errors={errors}
                validationOptions={{
                    ...passwordValidation,
                    ...requiredValidation,
                }}
            />
        </div>
    )

    return (
        <Modal
            isOpen={isOpen}
            title="Change password"
            actionLabel="Save"
            onSubmit={handleSubmit(onSubmit)}
            toggleModal={toggle}
            body={bodyContent}
        />
    )

}