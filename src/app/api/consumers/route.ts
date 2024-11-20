import { NextResponse } from "next/server";
import ConsumerModel from "@/model/Consumer"; // Replace with your actual model path
import dbConnect from "@/lib/dbConnect"; // Utility to connect to MongoDB

// GET: Fetch all consumers
export async function GET() {
  try {
    await dbConnect();
    const consumers = await ConsumerModel.find();
    return NextResponse.json(consumers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch consumers" },
      { status: 500 },
    );
  }
}

// POST: Add a new consumer
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
    const newConsumer = await ConsumerModel.create(body);
    return NextResponse.json(newConsumer, { status: 201 });
  } catch (error) {
    console.error("Error adding new consumer:", error);
    return NextResponse.json(
      { error: "Failed to create consumer" },
      { status: 400 },
    );
  }
}
