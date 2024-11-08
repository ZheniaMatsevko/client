import axios from "axios";
import {EditUser, NewUser, Password} from "../types/usersTypes";

export default class UserService {
    static async getAllUsers() {
        try {
            const response = await axios.get('http://localhost:8090/users');
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }
    static async getUserById(id:number|string) {
        try {
            const response = await axios.get(`http://localhost:8090/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async createUser(user: NewUser, file?: File) {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            formData.append('user', JSON.stringify(user));
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const response = await axios.post('http://localhost:8090/users/new', formData, config);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async editUser(user: EditUser, id: number, file?: File) {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            formData.append('user', JSON.stringify(user));
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.put(`http://localhost:8090/users/${id}`, formData, config);
            return response.data;
        } catch (error) {
            console.error('Error editing user:', error);
            throw error;
        }
    }

    static async changePassword(password: Password) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const response = await axios.put(`http://localhost:8090/users/password`, password, config);
            return response.data;
        } catch (error) {
            console.error('Помилка при зміні пароля:', error);
            throw error;
        }
    }


    static async deleteUserById(id: number) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            return await axios.delete(`http://localhost:8090/users/${id}`, config);
        } catch (error) {
            console.error('Помилка при видаленні користувача:', error);
            throw error;
        }
    }


    static async signIn(username: string, password: string) {
        try {
            const response = await axios.post('http://localhost:8090/signin', {username, password});
            return response.data;
        } catch (error) {
            console.error('Помилка авторизації з сервера:', error);
            throw error;
        }

    }
}