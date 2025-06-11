// For Context API
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '@/context/CartContext';

describe('useCart (Context API)', () => {
  const mockProduct = { id: 1, title: 'Product A', price: 10, images: ['img.jpg'] };
  const mockProductB = { id: 2, title: 'Product B', price: 20, images: ['img.jpg'] };

  it('adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it('increases quantity if product already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('removes product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('updates product quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
  });
});