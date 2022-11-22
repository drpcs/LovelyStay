import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../App';

describe('View', () => {
    test('testing go back button', async () => {
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
        await (waitFor(() => screen.getByText(/Diego/i),{timeout:5000}));
        userEvent.click(screen.getByText(/Go Back/i));
        await waitFor(
            () => expect (
                screen.getByText(/Search GitHub profile by Username/i)
            ).toBeInTheDocument()
        )
     });

     test('testing render repositories list', async () => {
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
                screen.getByText(/Exercise-01/i)
            ).toBeInTheDocument(),{timeout:5000}
        )
     });

});
