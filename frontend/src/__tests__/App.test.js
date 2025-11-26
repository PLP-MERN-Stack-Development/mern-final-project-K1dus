import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders task management heading', () => {
  render(<App />);
  const heading = screen.getByText(/Task Management/i);
  expect(heading).toBeInTheDocument();
});
