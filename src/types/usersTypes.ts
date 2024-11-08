
export interface MyToken {
    id: number;
}
export type Password = {
    id: number;
    oldPassword: string;
    newPassword: string;
}
export interface NewUser {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface EditUser{
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}
export interface User extends NewUser{
    id: number;
    profileImageUrl: string;
}
