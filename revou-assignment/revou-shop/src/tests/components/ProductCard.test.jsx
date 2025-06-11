import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ui/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    images: ['https://example.com/image.jpg'],
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Product' })).toBeInTheDocument();
  });

  it('links to the correct product detail page', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link', { name: /Test Product/i });
    expect(link).toHaveAttribute('href', '/product/1');
  });
});