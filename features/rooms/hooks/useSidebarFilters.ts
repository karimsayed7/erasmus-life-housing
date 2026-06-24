"use client";

import { useQueryState, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";
import { toggleItem } from "./utils";

const sharedOptions = { shallow: false }


export function useSidebarFilters() {
  const [, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions(sharedOptions));

  const [locations, setLocations] = useQueryState(
    "location",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions(sharedOptions)
  );

  const toggleLocation = (value: string) => {
    toggleItem(value, locations, setLocations);
    setPage(null);
  };

  const [neighborhoods, setNeighborhoods] = useQueryState(
    "neighborhood",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions(sharedOptions)
  );

  const toggleNeighborhoods = (value: string) => {
    toggleItem(value, neighborhoods, setNeighborhoods);
    setPage(null);
  };

  const [roomTypes, setRoomTypes] = useQueryState(
    "roomType",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions(sharedOptions)
  );

  const toggleRoomTypes = (value: string) => {
    toggleItem(value, roomTypes, setRoomTypes);
    setPage(null);
  };

  const [amenities, setAmenities] = useQueryState(
    "amenities",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions(sharedOptions)
  );

  const toggleAmenities = (value: string) => {
    toggleItem(value, amenities, setAmenities);
    setPage(null);
  };

  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(100).withOptions(sharedOptions)
  );

  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(1000).withOptions(sharedOptions)
  );

  const [fromDate, setFromDate] = useQueryState(
    "fromDate",
    parseAsString.withDefault("").withOptions(sharedOptions)
  );

  const [toDate, setToDate] = useQueryState(
    "toDate",
    parseAsString.withDefault("").withOptions(sharedOptions)
  );

  return {
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
    setToDate
  };
}