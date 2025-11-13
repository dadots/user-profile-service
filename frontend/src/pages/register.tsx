import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import FormWrapper from '../components/FormWrapper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/auth';

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        name: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, name, password } = values;
        if (email && name && password) {
            await register({ name, email, password }, navigate);
        } else {
            toast('Please fill out all fields.', { type: 'error' });
        }
    };

    return (  
        <FormWrapper title="Create an Account" bgGradient="from-green-100 to-green-300">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter Full Name"
                    onChange={e => setValues({...values, name: e.target.value})}
                    variant="green"
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter Email"
                    variant="green"
                    onChange={(e) => setValues({...values, email: e.target.value})}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    variant="green"
                    onChange={(e) => setValues({...values, password: e.target.value})}
                />

            <Button type="submit" variant="success" size="md">
                Register
            </Button>

            </form>
            <ButtonLink
                label="Already have an account?"
                to="/login"
                text="Login"
                variant="green"
            />
        </FormWrapper>    
    );
};

export default Register;