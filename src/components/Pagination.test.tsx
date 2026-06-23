import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders correct page numbers for few pages', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={3}
        onPageChange={onPageChange}
        totalResults={30}
        perPage={10}
      />
    );
    const pageButtons = screen.getAllByRole('button').filter(b => /^[0-9]+$/.test(b.textContent || ''));
    const texts = pageButtons.map(b => b.textContent);
    expect(texts).toEqual(['1', '2', '3']);
    expect(screen.getByText(/showing 1 to 10 of 30 results/i)).toBeInTheDocument();
  });

  it('calls onPageChange when clicking next page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={onPageChange}
        totalResults={50}
        perPage={10}
      />
    );
    const nextBtn = screen.getByLabelText('Next page');
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking a specific page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={onPageChange}
        totalResults={50}
        perPage={10}
      />
    );
    const page3 = screen.getByText('3');
    fireEvent.click(page3);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={onPageChange}
        totalResults={50}
        perPage={10}
      />
    );
    const prevBtn = screen.getByLabelText('Previous page');
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={5}
        totalPages={5}
        onPageChange={onPageChange}
        totalResults={50}
        perPage={10}
      />
    );
    const nextBtn = screen.getByLabelText('Next page');
    expect(nextBtn).toBeDisabled();
  });

  it('renders ellipsis for large page counts', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={5}
        totalPages={10}
        onPageChange={onPageChange}
        totalResults={100}
        perPage={10}
      />
    );
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});