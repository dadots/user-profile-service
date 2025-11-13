import axiosClient from './api';
import { toast } from 'react-toastify';

export const getProfile = async () => {
    try {
        const response = await axiosClient.get('/profile');
        return response.data;
    } catch (error) {
        console.error(error);
        toast('Failed to fetch profile.', { type: 'error' });
        throw error;
    }
};

export const updateProfile = async (data: { name: string; email: string; bio: string }) => {
    try {
        const response = await axiosClient.put('/profile', data);
        toast('Profile updated successfully!', { type: 'success' });
        return response.data;
    } catch (error) {
        console.error(error);
        toast('Failed to update profile.', { type: 'error' });
        throw error;
    }
};