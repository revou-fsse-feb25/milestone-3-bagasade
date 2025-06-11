'use client';

import { useCart } from '@/context/CartContext'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart(); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="container mx-auto p-4">Loading cart...</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center border rounded-lg p-4 shadow-sm">
              <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded" />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 px-3 py-1 rounded-l-md"
                  >-</button>
                  <span className="px-4 py-1 border-y">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded-r-md"
                  >+</button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >Remove</button>
                </div>
              </div>
              <div className="text-lg font-bold ml-auto">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="text-right text-2xl font-bold mt-6">
            Total: ${total.toFixed(2)}
          </div>
          <div className="text-right mt-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}