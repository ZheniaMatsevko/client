import UserService from "../API/UserService";
import {jwtDecode} from "jwt-decode";
import {MyToken} from "../types/usersTypes";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Input from "../components/input/Input";
import {requiredValidation} from "../utils/validationUtils";
import toast, {Toaster} from "react-hot-toast";

function App() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: ''
        },
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        let token: string | undefined = undefined;
        UserService.signIn(data.username, data.password)
            .then(async (data) => {
                    reset();
                    token = data;
                    const userId: number = jwtDecode<MyToken>(data).id;
                    const userData = await UserService.getUserById(userId);
                    localStorage.setItem("token", data);
                    localStorage.setItem("currentUser", JSON.stringify(userData));
                    console.log(token); // Log the token to verify
                    navigate(`/events`);
                }
            )
            .catch((error) => {
                reset();
                toast.error("Failed to log in to your profile")
                console.error('Error in authorization:', error);
            });

    }
    const handleClick = () => {
        navigate(`/register`);
    };
    return (
        <div className="container-fluid" style={{marginTop: '20vh'}}>
            <div className="row justify-content-start align-items-center">
                <div className="col-md-6">
                    <div className="mb-3" style={{width: '60%'}}>
                        <h1 style={{color: '#fff', fontFamily: 'Bitter, serif', fontSize: '40px'}}
                            className="text-center">Sign In</h1>
                    </div>
                    <form>
                        <Input id="username"
                               label="Username"
                               placeholder="Username"
                               register={register}
                               errors={errors}
                               style={{width: '60%'}}
                               validationOptions={{
                                   ...requiredValidation,
                               }}/>

                        <Input
                            id="password"
                            label="Password"
                            placeholder="Password"
                            type="password"
                            register={register}
                            errors={errors}
                            validationOptions={{
                                ...requiredValidation
                            }}
                            style={{width: '60%'}}
                        />
                        <div className="d-grid" style={{width: '60%'}}>
                            <div className="row-cols-md-2">
                                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary me-3" type="submit" style={{width: '48%'}}>Sign In</button>
                                <button onClick={handleClick} className="btn btn-secondary" type="button" style={{width: '48%'}}>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    );
}

export default App;
