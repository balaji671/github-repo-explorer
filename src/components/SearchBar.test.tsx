import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input and submit button', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search repositories/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search repositories/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'react' } });
    expect(input.value).toBe('react');
  });

  it('calls onSearch with trimmed query on submit', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/search repositories/i);
    fireEvent.change(input, { target: { value: '  vue  ' } });
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).toHaveBeenCalledWith('vue');
  });

  it('disables input and button when loading', () => {
    render(<SearchBar onSearch={vi.fn()} loading={true} />);
    const input = screen.getByPlaceholderText(/search repositories/i) as HTMLInputElement;
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Searching...');
  });
});
