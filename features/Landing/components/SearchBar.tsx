"use client";
import { SlidersHorizontal, Euro, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useState } from "react";

export function SearchBar() {
  const t = useTranslations("Search");
  const router = useRouter();
  const locale = useLocale();

  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (budget) params.set("maxPrice", budget);
    if (roomType) params.set("roomType", roomType);

    router.push(`/${locale}/rooms?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-center mt-10 z-10 relative">
        <div
          className="bg-white border border-gray-400 rounded-md px-6 py-3 max-w-2xl shadow-sm"
          role="search"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-normal text-slate-800">{t("title")}</h3>
            <SlidersHorizontal size={18} className="text-gray-400" aria-hidden="true" />
          </div>

          {/* Inputs Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Location Select */}
            <div className="relative flex-1 min-w-[130px]">
              <label htmlFor="location-select" className="sr-only">
                {t("locationLabel")}
              </label>
              <select
                id="location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  {t("locationPlaceholder")}
                </option>
                <option value="Lisbon">{t("lisbon")}</option>
                <option value="Porto">{t("porto")}</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Budget */}
            <div className="flex items-center gap-2 flex-1 min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <label htmlFor="budget-input" className="sr-only">
                {t("budgetLabel")}
              </label>
              <Euro size={15} className="text-gray-400" aria-hidden="true" />
              <input
                id="budget-input"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={t("budgetPlaceholder")}
                className="border-none outline-none text-sm text-slate-700 bg-transparent w-full"
              />
            </div>

            {/* Room Type */}
            <div className="relative flex-1 min-w-[130px]">
              <label htmlFor="roomtype-select" className="sr-only">
                {t("roomtypeLabel")}
              </label>
              <select
                id="roomtype-select"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-400 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="" disabled>
                  {t("roomtypePlaceholder")}
                </option>
                <option value="Apartment">{t("apartment")}</option>
                <option value="Studio">{t("studio")}</option>
                <option value="Private Room">{t("privateroom")}</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-indigo-500 cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors whitespace-nowrap outline-none"
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}