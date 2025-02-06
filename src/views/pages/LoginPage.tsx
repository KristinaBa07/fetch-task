import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/authController";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    const navigate = useNavigate();

    async function handleLogin(name: string, email: string) {
        try {
            await loginUser({ name, email });

            navigate("/dogs");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check console for details.");
        }
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h2>Login</h2>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
}

export default LoginPage;
