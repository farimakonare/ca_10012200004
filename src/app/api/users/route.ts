import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Fetch all users
export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      orders: true,
      payments: true,
      reviews: true,
      cart: { include: { cartItems: true } },
    },
  });
  return NextResponse.json(users);
}

// Create a new user
export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.user.create({ data });
  return NextResponse.json(user, { status: 201 });
}

// Update user info
export async function PUT(req: Request) {
  const { user_id, ...data } = await req.json();
  const updated = await prisma.user.update({
    where: { user_id },
    data,
  });
  return NextResponse.json(updated);
}

// Remove a user by ID
export async function DELETE(req: Request) {
  const { user_id } = await req.json();
  await prisma.user.delete({ where: { user_id } });
  return NextResponse.json({ message: "User deleted" });
}
