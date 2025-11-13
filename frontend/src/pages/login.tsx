import React, { useState } from "react";
// import Input from "@/components/Input";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import FormWrapper from "../components/FormWrapper";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = values; 

        if (email && password) {
            await login({ email, password }, navigate);
        } else {
            toast('Please fill out all fields.', { type: 'error' });
        }
    };

    return (
        <FormWrapper title="Login to Your Account" bgGradient="from-blue-100 to-blue-300">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    variant="blue"
                    onChange={(e) => setValues({...values, email: e.target.value})}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    variant="blue"
                    onChange={(e) => setValues({...values, password: e.target.value})}
                />

                <Button type="submit" variant="primary" size="md">
                    Login
                </Button>
            </form>
            <ButtonLink
                label="Don’t have an account?"
                to="/register"
                text="Register"
                variant="blue"
            />
        </FormWrapper>
    );
};

export default Login;
