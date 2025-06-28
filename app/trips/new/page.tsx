"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrips } from "@/lib/actions/create-trips";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

function NewTrip() {
  const [isPending, startTransition] = useTransition();

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            action={(formData: FormData) => {
              if(imgUrl){
                formData.append('imgUrl',imgUrl)
              }
              startTransition(() => {
                createTrips(formData);
              });
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Japan trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                Description
              </label>
              <textarea
                name="description"
                placeholder="Trip Description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label>Trip Image</label>
              {imgUrl && (
                <Image
                  src={imgUrl}
                  height={100}
                  width={300}
                  alt="Trip Image Preview"
                  className="w-full  mb-4 rounded-md max-h-74 object-cover"
                />
              )}
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0].ufsUrl) setImgUrl(res[0].ufsUrl);
              }}
              onUploadError={(error: Error) => {
                console.error("Upload error: ", error);
              }}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {" "}
              {isPending ? "Creating..." : "Save New Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTrip;
