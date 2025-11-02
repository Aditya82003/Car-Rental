import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingDetails = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [pickupTime, setPickupTime] = useState<string>("");
  const [dropoffTime, setDropoffTime] = useState<string>("");

  const today = new Date();

  return (
    <>
      <div className="flex flex-col items-center gap-8 mt-10">
        {/* ================= PICKUP SECTION ================= */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Pickup Location */}
          <Input
            type="text"
            className="border border-gray-300 rounded-3xl py-3 w-72 pl-6 text-left hover:bg-gray-100 transition"
            placeholder="Enter Pick Up Location"
          />

          {/* Pick Up Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-72 justify-start text-left font-normal rounded-3xl py-3 pl-6",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                {pickupDate ? (
                  format(pickupDate, "PPP")
                ) : (
                  <span>Pick Up Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Pick Up Time */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-72 justify-start text-left font-normal rounded-3xl py-3 pl-6"
              >
                {pickupTime ? pickupTime : "Pick Up Time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align="start">
              <div className="grid gap-2 p-2">
                <Label htmlFor="pickup-time" className="text-sm font-medium">
                  Select Time
                </Label>
                <Input
                  id="pickup-time"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="border rounded-md"
                  min={
                    pickupDate &&
                    format(pickupDate, "yyyy-MM-dd") ===
                      format(today, "yyyy-MM-dd")
                      ? new Date().toISOString().slice(11, 16)
                      : undefined
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* ================= DROPOFF SECTION ================= */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Drop Off Location */}
          <Input
            type="text"
            className="border border-gray-300 rounded-3xl py-3 w-72 pl-6 text-left hover:bg-gray-100 transition"
            placeholder="Enter Drop Off Location"
          />

          {/* Drop Off Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-72 justify-start text-left font-normal rounded-3xl py-3 pl-6",
                  !dropoffDate && "text-muted-foreground"
                )}
              >
                {dropoffDate ? (
                  format(dropoffDate, "PPP")
                ) : (
                  <span>Drop Off Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dropoffDate}
                onSelect={setDropoffDate}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Drop Off Time */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-72 justify-start text-left font-normal rounded-3xl py-3 pl-6"
              >
                {dropoffTime ? dropoffTime : "Drop Off Time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align="start">
              <div className="grid gap-2 p-2">
                <Label htmlFor="dropoff-time" className="text-sm font-medium">
                  Select Time
                </Label>
                <Input
                  id="dropoff-time"
                  type="time"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="border rounded-md"
                  min={
                    dropoffDate &&
                    format(dropoffDate, "yyyy-MM-dd") ===
                      format(today, "yyyy-MM-dd")
                      ? new Date().toISOString().slice(11, 16)
                      : undefined
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* ================= SEARCH BUTTON ================= */}
        <div>
          <Button className="rounded-2xl bg-blue-700 text-white px-10 py-2 hover:bg-blue-800 transition">
            Search Cab
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
