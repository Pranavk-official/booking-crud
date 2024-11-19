"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
        <Button onClick={() => router.push("/consumer/add")}>
          Add New Consumer
        </Button>
      </div>

      {loading ? (
        <p>Loading consumers...</p>
      ) : consumers.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Consumer No</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Cylinders</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((consumer) => (
              <tr key={consumer._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {consumer.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {consumer.consumerNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {consumer.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {consumer.noOfCylinder}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/edit/${consumer._id}`)
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No consumers found.</p>
      )}
    </div>
  );
}
