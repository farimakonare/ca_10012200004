import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Fetch all products
export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      reviews: true,
      orderItems: true,
      cartItems: true,
    },
  });
  return NextResponse.json(products);
}

// Add a new product
export async function POST(req: Request) {
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product, { status: 201 });
}

// Update product info
export async function PUT(req: Request) {
  const { product_id, ...data } = await req.json();
  const updated = await prisma.product.update({
    where: { product_id },
    data,
  });
  return NextResponse.json(updated);
}

// Delete a product
export async function DELETE(req: Request) {
  const { product_id } = await req.json();
  await prisma.product.delete({ where: { product_id } });
  return NextResponse.json({ message: "Product deleted" });
}
