import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://vkqgunmfpvjkftehgtio.supabase.co'; // Your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcWd1bm1mcHZqa2Z0ZWhndGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NDAyNDMsImV4cCI6MjA0NDQxNjI0M30.aCA0aSE76g1LTkpvD7la7bAd8zG8WaQ4qSC_WgBBGVA'; // Your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Check if user is defined
            const user = data?.user;
            if (user) {
                console.log('User logged in:', user);
                navigate('/inventory'); // Redirect to your dashboard or another page
            } else {
                setError('User not found.');
            }
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ padding: '10px 15px' }}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
