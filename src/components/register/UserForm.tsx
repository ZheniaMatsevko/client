import {useNavigate} from "react-router-dom";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {User, NewUser, EditUser} from "../../types/usersTypes";
import UserService from "../../API/UserService";
import toast from "react-hot-toast";
import {
    emailValidation,
    imageFileValidation,
    passwordValidation,
    requiredValidation
} from "../../utils/validationUtils";
import Input from "../input/Input";
import React, {useEffect, useState} from "react";

const UserForm = () => {
    const navigate = useNavigate();
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const [user, setUser] = useState<User>();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            file: File
        },
    });
    useEffect(()=>{
        if(currentUser) {
            UserService.getUserById(currentUser.id)
                .then((data)=>{
                    setUser(data);
                })
                .catch(() => {
                    toast.error('Failed to edit user.');
                    navigate(-1)
                })
        }
    }, []);
    useEffect(()=>{
        if (user) {
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('firstname', user.firstname);
            setValue('lastname', user.lastname);
        }
    }, [user]);
    const onSubmit: SubmitHandler<FieldValues> = (data) => {


        if(user && currentUser){
            const userData: EditUser = {
                id: currentUser.id,
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname
            };
            UserService.editUser(userData,currentUser.id, data.file[0])
                .then((data) => {
                        toast.success("Successful editing")
                        reset();
                        navigate(`/my`);
                    }
                )
                .catch((error) => {
                    toast.error("Failed to edit your profile")
                    console.error('Error in editing your profile:', error);
                });
        }else{
            const userData: NewUser = {
                username: data.username,
                password: data.password,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname
            };
            UserService.createUser(userData, data.file[0])
                .then((data) => {
                        toast.success("Successful registration")
                        reset();
                        navigate(`/`);
                    }
                )
                .catch((error) => {
                    toast.error("Failed to create your profile")
                    console.error('Error in creating your profile:', error);
                });
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-md-6">
                <Input
                    id="firstname"
                    label="Firstname"
                    placeholder="Firstname"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                    }}
                    required
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="lastname"
                    label="Lastname"
                    placeholder="Lastname"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                    }}
                    required
                />
            </div>
            <div className="col-md-12">
                <Input
                    id="email"
                    label="Email"
                    placeholder="Email"
                    type='email'
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                        ...emailValidation
                    }}
                    required
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="username"
                    label="Username"
                    placeholder="Username"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                    }}
                    required
                />
            </div>
            {!user && !currentUser &&(
                <div className="col-md-6">
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        errors={errors}
                        validationOptions={{
                            ...requiredValidation,
                            ...passwordValidation
                        }}
                        required
                    />
                </div>
            )}
            {user && currentUser ?
                <>
                    <div className="col-md-3">
                        <img src={user?.profileImageUrl} alt={user?.username} style={{ maxHeight: '170px', objectFit: 'cover' }} />
                    </div>
                    <div className="col-md-9">
                        <Input
                            id={'file'}
                            label={'Choose new profile image'}
                            placeholder={'Choose new profile image'}
                            type={'file'}
                            register={register}
                            errors={errors}
                            validationOptions={{
                                ...imageFileValidation}}
                        ></Input>
                    </div>
                </> :
                <div className="col-md-12">
                    <Input
                        id={'file'}
                        label={'File'}
                        placeholder={'File'}
                        type={'file'}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            ...imageFileValidation}}
                    ></Input>
                </div>
            }
            <div className="col-12">
                <button type="submit" className="btn btn-primary">{user && currentUser ? "Save changes" : "Register"}</button>
            </div>
        </form>
    );
}
export default UserForm;