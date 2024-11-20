"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function EditConsumer() {
  const [formData, setFormData] = useState({
    name: "",
    consumerNo: "",
    phone: "",
    noOfCylinder: "",
  });
  const router = useRouter();
  const { id } = useParams();

  const { toast } = useToast();

  useEffect(() => {
    const fetchConsumer = async () => {
      try {
        const res = await fetch(`/api/consumers/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
        // toast({
        //   title: "Error",
        //   description: error.message,
        //   variant: "destructive",
        // });
      }
    };
    fetchConsumer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/consumers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({
          title: "Success",
          description: "Successfully updated consumer",
        });
        router.push("/dashboard");
      } else {
        console.error("Failed to update consumer");
        toast({
          title: "Failed",
          description: "Failed to update consumer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Edit Consumer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                name="consumerNo"
                type="number"
                placeholder="Consumer Number"
                value={formData.consumerNo}
                onChange={handleChange}
                required
              />
              <Input
                name="phone"
                placeholder="Phone (e.g., +91-9876543210)"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                name="noOfCylinder"
                type="number"
                placeholder="Number of Cylinders"
                value={formData.noOfCylinder}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-full">
                Update Consumer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
