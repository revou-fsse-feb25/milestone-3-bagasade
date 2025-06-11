import { NextResponse } from 'next/server';

const API_BASE = 'https://api.escuelajs.co/api/v1/products';

// GET all products (for admin view)
export async function GET() {
  try {
    const res = await fetch(API_BASE);
    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error: error.message }, { status: 500 });
  }
}

// POST new product
export async function POST(request) {
  try {
    const data = await request.json();
    // Validate data as needed
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: 'Failed to create product', error: errorData }, { status: res.status });
    }

    const newProduct = await res.json();
    // Trigger revalidation for relevant pages (e.g., home page)
    // You would call your revalidate API route here or programmatically revalidate
    // fetch(`/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}&path=/`);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product', error: error.message }, { status: 500 });
  }
}