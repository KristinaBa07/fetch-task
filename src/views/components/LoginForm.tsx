import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface LoginFormProps {
    onSubmit: (name: string, email: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(name, email);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={styles.formWrapper}>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Button variant="contained" type="submit">Login</Button>
        </Box>
    );
}

const styles = {
    formWrapper: { display: "flex", flexDirection: "column", gap: 2, width: 300 }
}

export default LoginForm;
