import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file for styling

// Replace with your actual environment variables setup (e.g., Vite)
const supabaseUrl = 'https://vkqgunmfpvjkftehgtio.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZmxhZWJ4eWlwaXdyaGxwcXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3OTM0MzMsImV4cCI6MjA0NjM2OTQzM30.ptUF0JoOcawNcHNWmZZo1rzToZMDDZIHQ1X3e0QGQnY"; // Ensure the key is loaded from the env
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

        if (!email || !password) {
            setError('Please fill in both fields');
            setLoading(false);
            return;
        }

        // Log in the user
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);  // Show the error if login fails
        } else {
            const user = data?.user;
            if (user) {
                console.log('User logged in:', user);
                navigate('/inventory');  // Redirect on successful login
            } else {
                setError('User not found.');
            }
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to your account</p>
                <form onSubmit={handleLogin}>
                    <div className="form-groups">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={loading} className='login-button w-full bg-violet-600'>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="login-footer">Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Login;
