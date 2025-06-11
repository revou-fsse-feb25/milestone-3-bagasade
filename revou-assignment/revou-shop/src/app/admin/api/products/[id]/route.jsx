import { NextResponse } from 'next/server';

const API_BASE = 'https://api.escuelajs.co/api/v1/products';

// GET single product by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product', error: error.message }, { status: 500 });
  }
}

// PUT (Update) product by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: 'Failed to update product', error: errorData }, { status: res.status });
    }

    const updatedProduct = await res.json();
    // Trigger revalidation for product detail page and home page
    // fetch(`/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}&path=/product/${id}`);
    // fetch(`/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}&path=/`);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product', error: error.message }, { status: 500 });
  }
}

// DELETE product by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: 'Failed to delete product', error: errorData }, { status: res.status });
    }

    // Platzi Fake API returns an object with `true` on successful deletion
    // If it returns an empty body or specific success message, adjust accordingly.
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product', error: error.message }, { status: 500 });
  }
}