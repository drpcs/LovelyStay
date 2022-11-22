import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../App';

describe('Search', () => {
    test('renders page', () => {
        render(<App />);
        const linkElement = screen.getByText(/Search GitHub profile by Username/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('Empty input', async () => {
        render(<App />);
        userEvent.click(screen.getByRole("button", {name: /search/i}));
        await waitFor(
            () => expect (
                screen.getByText(/Search field can't be blank/i)
            ).toBeInTheDocument()
        );
    });

    test('Invalid value', async () => {
        render(<App />);
        fireEvent.change(
            screen.getByPlaceholderText('Type the username'), 
            { 
                target: { 
                    value: 'invalid username'
                } 
            }
        );
        userEvent.click(screen.getByRole("button", {name: /search/i}));
        await waitFor(
            () => expect (
                screen.getByText(/Please type only letters and numbers/i)
            ).toBeInTheDocument()
        );
    });    

    test('valid value', async () => {
        render(<App />);
        fireEvent.change(
            screen.getByPlaceholderText('Type the username'), 
            { 
                target: { 
                    value: 'drpcs'
                } 
            }
        );
        userEvent.click(screen.getByRole("button", {name: /search/i}));
        await waitFor(
            () => expect (
                screen.getByText(/Diego/i)
            ).toBeInTheDocument(),{timeout:5000}
        );
    });     
});
