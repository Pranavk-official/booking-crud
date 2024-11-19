import mongoose, { Schema, Document } from "mongoose";

export interface Consumer extends Document {
  name: string;
  consumerNo: number;
  phone: string;
  noOfCylinder: number;
}

const ConsumerSchema: Schema<Consumer> = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  consumerNo: {
    type: Number,
    required: [true, "Consumer number is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
    match: [/[+][9][1]-[7-9]\d{9}/gim, "Enter valid 10-digit phone number"],
  },
  noOfCylinder: {
    type: Number,
    required: [true, "Number of cylinders is required"],
  },
});

const ConsumerModel =
  (mongoose.models.Consumer as mongoose.Model<Consumer>) ||
  mongoose.model<Consumer>("Consumer", ConsumerSchema);

export default ConsumerModel;
