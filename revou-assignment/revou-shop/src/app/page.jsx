import ProductCard from '@/components/ui/ProductCard';

async function getProducts() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10', {
    next: { revalidate: 3600 } // Revalidate every hour (ISR if deployed)
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}