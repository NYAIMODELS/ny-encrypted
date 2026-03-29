import React from 'react';

const Login = () => {
    const handleLogin = (event) => {
        event.preventDefault();
        // handle authentication logic here
    };

    const handleGoogleLogin = () => {
        // handle Google OAuth login logic here
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;