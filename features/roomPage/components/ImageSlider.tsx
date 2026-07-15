"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import RoomImage from "@/components/shared/RoomCard/RoomImage";
import { useTranslations } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  roomImages: string[] | null;
}

export default function ImageSlider({ roomImages }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const t2 = useTranslations("RentARoom");

  if (!roomImages?.length) return null;

  return (
    <div className="w-full"> 
      {/* Main Slider */}
      <Swiper
        modules={[Navigation]}
        navigation
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="mb-2"
      >
        {roomImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden"> 
              <RoomImage
                src={img}
                alt={`Room image ${index + 1}`}
                noImageText={t2("Filters.noImage")}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <div className="flex gap-2 md:gap-4">
        {roomImages.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              swiper?.slideTo(index);
              setActiveIndex(index);
            }}
            className={`
              relative h-16 md:h-24 flex-1 overflow-hidden  
              border-4 transition-all duration-200
              ${activeIndex === index ? "border-blue-500" : "border-transparent"}
            `}
          >
            <RoomImage
                src={img}
                alt={`Room image ${index + 1}`}
                noImageText={t2("Filters.noImage")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}