import { vi } from 'vitest';
vi.mock('../services/api', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ status: 201, data: { id: 1 } })),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Register from '../pages/register';
import axiosClient from '../services/api';

test('renders register form', () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('submits register form', async () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
        expect(axiosClient.post).toHaveBeenCalled();
    });
});