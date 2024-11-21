"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Consumer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Welcome to the Consumer Management System. You can add, edit, and
            manage consumers here.
          </p>
          <div className="mt-4 space-x-2">
            <Link href="/dashboard/consumer/add">
              <Button>Add Consumer</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary">View Consumers</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
