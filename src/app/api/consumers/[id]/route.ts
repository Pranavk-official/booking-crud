import { NextResponse } from "next/server";
import ConsumerModel from "@/model/Consumer";
import dbConnect from "@/lib/dbConnect";

// GET: Fetch a single consumer by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const consumer = await ConsumerModel.findById(params.id);
    if (!consumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(consumer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch consumer" },
      { status: 500 },
    );
  }
}

// PUT: Update a consumer by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedConsumer = await ConsumerModel.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedConsumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedConsumer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update consumer" },
      { status: 400 },
    );
  }
}

// DELETE: Remove a consumer by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    const deletedConsumer = await ConsumerModel.findByIdAndDelete(params.id);
    if (!deletedConsumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Consumer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete consumer" },
      { status: 500 },
    );
  }
}
