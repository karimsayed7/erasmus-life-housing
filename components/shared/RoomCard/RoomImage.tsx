// features/rooms/components/roomsGrid/RoomImage.tsx
'use client'

import Image from "next/image"
import { useState } from "react"

type Props = {
  src: string
  alt: string
  noImageText: string
}

export default function RoomImage({ src, alt, noImageText }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-medium">
        {noImageText}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover "
      onError={() => setError(true)}
    />
  )
}