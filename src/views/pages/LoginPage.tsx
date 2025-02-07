import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/authController";
import LoginForm from "../components/LoginForm";
import {Box, Typography} from "@mui/material";

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
        <Box sx={styles.loginFormWrap}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> Login </Typography>
            <LoginForm onSubmit={handleLogin} />
        </Box>
    );
}

const styles = {
    loginFormWrap: { mt: 20, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }
}

export default LoginPage;
