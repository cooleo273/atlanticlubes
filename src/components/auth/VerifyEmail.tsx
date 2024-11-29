import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {  User } from '@supabase/supabase-js';
import { supabase } from './Supabase';


const VerifyEmail: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const confirmEmail = async () => {
            const queryParams = new URLSearchParams(location.hash.replace('#', '?'));
            const accessToken = queryParams.get('access_token');
            const refreshToken = queryParams.get('refresh_token');

            if (accessToken && refreshToken) {
                // Set the access token in the Supabase client
                const { data, error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });

                if (error) {
                    console.error('Error setting session:', error.message);
                } else {
                    console.log('Session set successfully:', data.user);

                    // Check if the user is verified
                    const user: User | null = data.user;
                    if (user) {
                        const emailVerified = user.user_metadata?.email_verified || false; // Assuming you have stored this status

                        if (emailVerified) {
                            // Redirect to login or show a success message
                            console.log('Email verified successfully!');
                        } else {
                            console.log('Email not verified yet.');
                        }
                    }
                }
            } else {
                console.error('No access token found in the URL.');
            }
        };

        confirmEmail();
    }, [location]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>Please wait while we verify your email...</p>
        </div>
    );
};

export default VerifyEmail;
