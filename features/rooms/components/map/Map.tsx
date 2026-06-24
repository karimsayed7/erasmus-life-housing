"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale } from "next-intl";
import { Database } from "@/features/types/database";
import { useRouter } from "next/navigation";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

type MapProps = {
  rooms: Room[];
};

function createCustomMarker() {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 18px;
        height: 24px;
        background-color: #1a1a1a;
        border: 2.5px solid #ffffff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [18, 24],
    iconAnchor: [9, 24],
    popupAnchor: [0, -26],
  });
}

export default function Map({ rooms }: MapProps) {
  const locale = useLocale();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();


  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const portugalBounds = L.latLngBounds(
      L.latLng(36.8, -9.6),
      L.latLng(42.2, -6.1),
    );

    const map = L.map(containerRef.current, {
      center: [41.155, -8.63],
      zoom: 13,
      minZoom: 6,
      maxZoom: 17,
      maxBounds: portugalBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const icon = createCustomMarker();

    rooms.forEach((room) => {
      if (room.lat == null || room.lng == null) return;

      const title = room.title as Record<string, string>;
      const location = room.location as Record<string, string>;

      const marker = L.marker([room.lat, room.lng], { icon });

      const tooltipContent = `
        <div class="p-2 w-55 rounded-lg">
         <div class="overflow-hidden h-25 rounded-lg mb-3"> <img src="${room.images?.[0] ?? ""}" class="object-cover rounded-lg" /> </div> <h1 class="font-bold text-[14px] mb-2.5"> ${title?.[locale] ?? title?.en ?? ""} </h1> <div class="flex gap-3 justify-between "> <p class="text-gray-400 text-wrap"> ${location?.[locale] ?? location?.en ?? ""} </p> <p class="font-extrabold text-[16px]">${room.price}€</p> </div> </div>
      `;

      const getDirection = (point: L.Point, size: L.Point) => {
        const margin = 180;

        if (point.y < margin)
          return { dir: "bottom", offset: [0, 8] as [number, number] };
        if (point.x < margin)
          return { dir: "right", offset: [8, 0] as [number, number] };
        if (point.x > size.x - margin)
          return { dir: "left", offset: [-8, 0] as [number, number] };

        return { dir: "top", offset: [0, -8] as [number, number] };
      };

      marker.on("click", () => {
        router.push(`/${locale}/rooms/${room.id}`);
      });

      marker.on("mouseover", () => {
        const point = map.latLngToContainerPoint(marker.getLatLng());
        const size = map.getSize();

        const { dir, offset } = getDirection(point, size);

        marker.unbindTooltip();

        marker.bindTooltip(tooltipContent, {
          permanent: false,
          direction: dir as L.Direction,
          offset,
          className: "erasmus-tooltip",
        });

        marker.openTooltip();
      });

      marker.on("mouseout", () => {
        marker.closeTooltip();
      });

      marker.addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [rooms, locale]);

  return (
    <>
      <style>{`
        .erasmus-tooltip {
          background: rgba(255, 255, 255, 0.92);
          border: none;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 6px 24px rgba(0,0,0,0.18);
          max-width: none !important;
        }

        .erasmus-tooltip::before {
          display: none;
        }

        .room-tooltip-card {
          width: 190px;
          padding: 10px;
        }

        .room-tooltip-image-wrap {
          height: 110px;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .room-tooltip-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .room-tooltip-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .room-tooltip-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .room-tooltip-location {
          font-size: 12px;
          color: #666;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          flex: 1;
        }

        .room-tooltip-price {
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
        }
      `}</style>

      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
}
