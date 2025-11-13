/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from './api';
import { toast } from 'react-toastify';

export const login = async (values: { email: string; password: string }, navigate: any) => {
    try {
        const response = await axiosClient.post('/auth/login', values);
        if (response.status === 200 && response.data.token) {
            localStorage.setItem('token', response.data.token);
            navigate('/');
        }
    } catch (error) {
        console.error(error);
        toast('Login failed. Please try again.', { type: 'error' });
    }
};

export const register = async (values: { email: string; name: string; password: string }, navigate: any) => {
    try {
        const response = await axiosClient.post('/auth/register', values);
        if (response.status === 201) {
            toast('Registration successful! Please login.', { type: 'success' });
            navigate('/login');
        }
    } catch (error) {
        console.error(error);
        toast('Registration failed. Please try again.', { type: 'error' });
    }
};