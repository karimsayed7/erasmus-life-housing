"use client";

import React, { useState } from "react";
import { List, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSidebarFilters } from "../../hooks/useSidebarFilters";
import { LocationFilter } from "./components/LocationFilter";
import { BudgetFilter } from "./components/BudgetFilter";
import { DatesFilter } from "./components/DatesFilter";
import { NeighborhoodFilter } from "./components/NeighborhoodFilter";
import { RoomTypeFilter } from "./components/RoomTypeFilter";
import { AmentitiesFilter } from "./components/AmentitiesFilter";

function SidebarFilters() {
  const [expanded, setExpanded] = useState(false);

  const {
    locations,
    toggleLocation,
    neighborhoods,
    toggleNeighborhoods,
    roomTypes,
    toggleRoomTypes,
    amenities,
    toggleAmenities,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useSidebarFilters();

  return (
    <div>
      {expanded && (
        <div
          className="
            fixed inset-0
            bg-black/20
            backdrop-blur-sm
            z-40
            xl:hidden
          "
          onClick={() => setExpanded(false)}
        />
      )}
      <aside
        className={`
          sticky top-0
          pt-8
          pl-4
          h-screen
          border-r
          border-gray-200
          bg-white
          overflow-y-auto
          transition-all
          duration-300
          shrink-0
          z-50
          h-screen
          overflow-y-auto
          scrollbar-hide
          
          xl:w-80
          ${expanded ? "w-80" : "w-20"}
        `}
      >
        {/* Mobile / Tablet Toggle */}
        <div className="xl:hidden ml-2 pb-4 pt-0">
          <Button
            size="icon"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <X /> : <List />}
          </Button>
        </div>
      
        {/* Filters */}
        <div
          className={`
            transition-opacity
            duration-200
            px-6 pb-10
            ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}
            xl:opacity-100
            xl:pointer-events-auto
          `}
        >
          <div className="flex flex-col gap-4 ">
            <LocationFilter
              locations={locations}
              toggleLocation={toggleLocation}
            />
      
            <BudgetFilter
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
      
            <DatesFilter
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
            />
      
            <NeighborhoodFilter
              neighborhoods={neighborhoods}
              toggleNeighborhoods={toggleNeighborhoods}
            />
      
            <RoomTypeFilter
              roomTypes={roomTypes}
              toggleRoomTypes={toggleRoomTypes}
            />
      
            <AmentitiesFilter
              amenities={amenities}
              toggleAmenities={toggleAmenities}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SidebarFilters;