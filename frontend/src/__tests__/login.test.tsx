import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';
import { vi } from 'vitest';

vi.mock('../services/api', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ status: 200, data: { token: 'mock-token' } })),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

import axiosClient from '../services/api';

test('renders login form', () => {
    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('submits login form', async () => {
    render(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
        expect(axiosClient.post).toHaveBeenCalled();
    });
});
