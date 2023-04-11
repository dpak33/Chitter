import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PeepForm from '../components/PeepForm';
import axios from 'axios';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));

describe('PeepForm component', () => {


    it('should submit the form with the correct data', async () => {
        render(<PeepForm username="testuser" />);
        const descriptionInput = screen.getByLabelText('Peep');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(descriptionInput, { target: { value: 'Test peep' } });
        fireEvent.click(submitButton);

        expect(axios.post).toHaveBeenCalledWith('/api/peep', {
            description: 'Test peep',
            username: 'testuser',
        });
    });

    it('should render a form with a submit button', () => {
        render(<PeepForm />);
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
        const form = submitButton.closest('form');
        expect(form).toBeInTheDocument();
    });

    it('should update the description state when the user types in the input field', () => {
        render(<PeepForm />);
        const inputField = screen.getByPlaceholderText('What\'s happening?');
        fireEvent.change(inputField, { target: { value: 'Hello World!' } });
        expect(inputField).toHaveValue('Hello World!');
    });

    it('should update the description state when the input field is updated', () => {
        render(<PeepForm username="johndoe" />);

        const inputField = screen.getByPlaceholderText("What's happening?");

        fireEvent.change(inputField, { target: { value: 'Hello World!' } });

        expect(inputField).toHaveValue('Hello World!');
    });

});