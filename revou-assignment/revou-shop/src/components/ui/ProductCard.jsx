// src/components/ui/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="block border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={product.images[0]} // Assuming the first image
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-gray-700 mt-1">${product.price.toFixed(2)}</p>
    </Link>
  );
}