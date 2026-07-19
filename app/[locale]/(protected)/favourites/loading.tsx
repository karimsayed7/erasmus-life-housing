import RoomCardSkeleton from "@/components/shared/RoomCard/RoomCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="px-6 md:px-12 lg:px-25 mt-50 mb-30">

      <div className="grid grid-cols-1 gap-12 lg:gap-18 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}