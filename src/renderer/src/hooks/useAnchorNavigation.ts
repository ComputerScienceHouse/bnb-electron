import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

export const useAnchorNavigation = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]); // Re-run this effect whenever the location changes
};