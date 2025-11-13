import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { getProfile } from '@/services/profile';
import HeroSection from '@/components/HeroSection';

const Home = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    const navigateToLogin = useCallback(() => navigate('/login'), [navigate]);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const profile = await getProfile();
                setUserName(profile.name);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                localStorage.removeItem('token');
                navigateToLogin();
            }
        };

        fetchUserName();
    }, [navigateToLogin]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            <Navbar userName={userName} onLogout={handleLogout} />
            <HeroSection />
        </>
    );
};

export default Home;