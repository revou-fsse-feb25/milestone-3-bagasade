import Link from 'next/link';
import { revalidatePath } from 'next/cache'; // For server actions/revalidation from the same route

async function getAdminProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/admin/api/products`, {
    cache: 'no-store' // Always fetch fresh data for admin panel
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products for admin');
  }
  return res.json();
}

export default async function AdminDashboard() {
  const products = await getAdminProducts();

  const handleDelete = async (productId) => {
    'use server'; // Use server actions for direct server interaction

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/admin/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
      revalidatePath('/admin'); // Revalidate the admin products list
      revalidatePath('/'); // Revalidate the home page
      revalidatePath(`/product/${productId}`); // Revalidate the product detail page
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error in UI
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Products</h1>
      <Link href="/admin/products/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4 inline-block">
        Add New Product
      </Link>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                  <form action={handleDelete.bind(null, product.id)} className="inline-block">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}