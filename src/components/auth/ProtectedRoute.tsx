// src/components/auth/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
 // src/components/auth/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vkqgunmfpvjkftehgtio.supabase.co'; // Your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcWd1bm1mcHZqa2Z0ZWhndGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NDAyNDMsImV4cCI6MjA0NDQxNjI0M30.aCA0aSE76g1LTkpvD7la7bAd8zG8WaQ4qSC_WgBBGVA'; // Your Supabase key
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
