import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';
import axios from 'axios';
import PeepForm from '../components/PeepForm';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));

describe('Register component', () => {
    it('should render all input fields', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        const nameInput = screen.getByPlaceholderText('name');
        const usernameInput = screen.getByPlaceholderText('username');
        const emailInput = screen.getByPlaceholderText('email');
        const passwordInput = screen.getByPlaceholderText('password');
        expect(nameInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });


    it('should register a user when the register button is clicked', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const nameInput = screen.getByPlaceholderText('name');
        const usernameInput = screen.getByPlaceholderText('username');
        const emailInput = screen.getByPlaceholderText('email');
        const passwordInput = screen.getByPlaceholderText('password');
        const registerButton = screen.getByRole('button', { name: /register/i });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        await act(async () => {
            fireEvent.click(registerButton);
        });

        expect(axios.post).toHaveBeenCalledWith('api/auth/register', {
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'password'
        });
    });


});




















