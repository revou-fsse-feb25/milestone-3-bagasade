import Image from 'next/image';

async function getProduct(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:flex">
      <div className="md:w-1/2 relative h-96">
        <Image
          src={product.images[0]}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <p className="text-2xl text-green-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}