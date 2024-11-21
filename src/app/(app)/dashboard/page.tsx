"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Consumer {
  _id: string;
  name: string;
  consumerNo: number;
  phone: string;
  noOfCylinder: number;
}

export default function Dashboard() {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch consumers from the API
  const fetchConsumers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consumers");
      const data = await res.json();
      setConsumers(data);
    } catch (error) {
      console.error("Failed to fetch consumers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a consumer
  const deleteConsumer = async (id: string) => {
    try {
      const res = await fetch(`/api/consumers/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchConsumers(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete consumer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConsumers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">User Management Dashboard</h1>
        <Button onClick={() => router.push("/dashboard/consumer/add")}>
          Add New Consumer
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border animate-spin inline-block w-5 h-5 border-b-2 border-blue-500 rounded-full"
            role="status"
          >
            <span className="hidden">Loading...</span>
          </div>
        </div>
      ) : consumers.length > 0 ? (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Consumer No</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Cylinders</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consumers.map((consumer) => (
              <TableRow key={consumer._id}>
                <TableCell>{consumer.name}</TableCell>
                <TableCell>{consumer.consumerNo}</TableCell>
                <TableCell>{consumer.phone}</TableCell>
                <TableCell>{consumer.noOfCylinder}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/consumer/edit/${consumer._id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteConsumer(consumer._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No consumers found.</p>
      )}
    </div>
  );
}
