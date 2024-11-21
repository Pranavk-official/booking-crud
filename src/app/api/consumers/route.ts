import { NextResponse } from "next/server";
import ConsumerModel from "@/model/Consumer"; // Replace with your actual model path
import dbConnect from "@/lib/dbConnect"; // Utility to connect to MongoDB

// GET: Fetch all consumers
export async function GET() {
  try {
    await dbConnect();
    const consumers = await ConsumerModel.find();
    return NextResponse.json(consumers);
  } catch (_error) {
    console.error("An error occurred", _error);
    return NextResponse.json(
      { error: "Failed to fetch consumers" },
      { status: 500 }
    );
  }
}

// POST: Add a new consumer
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const existingConsumer = await ConsumerModel.findOne({
      $or: [
        { consumerNo: body.consumerNo },
        { phone: body.phone },
        { name: body.name },
      ],
    });

    if (existingConsumer) {
      const errorMessage = () => {
        if (existingConsumer.consumerNo === body.consumerNo) {
          return "Consumer with this consumer number already exists";
        } else if (existingConsumer.phone === body.phone) {
          return "Consumer with this phone number already exists";
        } else {
          return "Consumer with this name already exists";
        }
      };

      return NextResponse.json({ error: errorMessage() }, { status: 400 });
    }

    const newConsumer = await ConsumerModel.create(body);
    return NextResponse.json(newConsumer, { status: 201 });
  } catch (error) {
    console.error("Error adding new consumer:", error);
    return NextResponse.json(
      { error: "Failed to create consumer" },
      { status: 400 }
    );
  }
}
