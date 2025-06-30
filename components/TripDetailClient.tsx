"use client";

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TripDetailClientProps {
  trip: Trip;
}
function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
          <Image fill src={trip.imageUrl} alt={trip.title} priority />
        </div>
      )}
      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-6 w-6 mr-3 text-gray-500" />

            <span>
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              {" "}
              <Plus className="mr-2 h-5 w-5" /> Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4"> Trip Summary</h2>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                  <p className="font-medium text-gray-700"> Dates</p>
                  </div
                  >
                  <p className="text-sm text-gray-500">
                    {trip.startDate.toLocaleDateString()} -{" "}
                    {trip.endDate.toLocaleDateString()}
                    <br />
                    {`${Math.round(
                      (trip.endDate.getTime() - trip.startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )} days(s)`}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {trip.description}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold"> Full Itinerary</h2>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TripDetailClient;
