// src/components/auth/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
 // src/components/auth/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error("Error fetching user:", error);
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(!!user);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;
