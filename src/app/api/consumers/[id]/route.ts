import { NextRequest, NextResponse } from "next/server";

import ConsumerModel from "@/model/Consumer";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const id = (await params).id;
    const consumer = await ConsumerModel.findById(id);
    if (!consumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(consumer);
  } catch (_error) {
    console.error("An error occurred", _error);
    return NextResponse.json(
      { error: "Failed to fetch consumer" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // Validate that the request body is not empty
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const updatedConsumer = await ConsumerModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedConsumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedConsumer);
  } catch (_error) {
    console.error("An error occurred", _error);
    return NextResponse.json(
      { error: "Failed to update consumer" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const deletedConsumer = await ConsumerModel.findByIdAndDelete(id);
    if (!deletedConsumer) {
      return NextResponse.json(
        { error: "Consumer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Consumer deleted successfully" });
  } catch (_error) {
    console.error("An error occurred", _error);
    return NextResponse.json(
      { error: "Failed to delete consumer" },
      { status: 500 }
    );
  }
}
