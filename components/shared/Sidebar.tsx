"use client";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation"; 
import { useTranslations } from "next-intl";
import {
  House,
  Sofa,
  LibraryBig,
  List,
  X,
  type LucideIcon,
} from "lucide-react";

const navs: {
  label: string;
  icon: LucideIcon;
  link: string;
}[] = [
  { label: "Dashboard", icon: House, link: "/admin" },
  { label: "Property Management", icon: Sofa, link: "/admin/PropertyManagement" },
  { label: "Booking Requests", icon: LibraryBig, link: "/admin/BookingRequests" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("Dsidebar")

  return (
    <div>
      {expanded && (
        <div
          className="
            fixed inset-0
            bg-black/20
            backdrop-blur-sm
            z-2000
            xl:hidden
          "
          onClick={() => setExpanded(false)}
        />
      )}

      <aside
        className={`
          sticky top-0
          h-screen
          pt-10
          px-4
          bg-gray-50  
          border-gray-200
          shrink-0
          overflow-hidden
          transition-all
          duration-300
          z-3000

          xl:w-62
          ${expanded ? "w-62" : "w-15 lg:w-20"}
        `}
      >
        {/* Mobile / Tablet Toggle */}
        <div className="xl:hidden ml-0 md:ml-2 pb-4">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="cursor-pointer"
          >
            {expanded ? <X /> : <List />}
          </button>
        </div>

        {/* Navigation */}
        <div
          className={`
            transition-opacity
            duration-200

            ${
              expanded
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }

            xl:opacity-100
            xl:pointer-events-auto
          `}
        >
          <div className="flex flex-col gap-2">
            {navs.map((nav) => {
              const Icon = nav.icon;
              const isActive = pathname === nav.link;
              return (
                <Link href={nav.link} key={nav.label} className="w-full">
                  <button
                    // onClick={() => setActive(nav.label)}
                    className={`flex items-center gap-3 px-4 py-2 w-full rounded-lg cursor-pointer ${
                      isActive
                        ? "bg-blue-900 text-white"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`
                        shrink-0
                        ${isActive
                          ? "text-white"
                          : "text-gray-800"}
                      `}
                    />

                    <p className="text-sm whitespace-nowrap">
                      {t(nav.label)}
                    </p>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}