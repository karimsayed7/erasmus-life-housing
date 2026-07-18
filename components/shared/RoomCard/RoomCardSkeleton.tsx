import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoomCardSkeleton() {
  return (
    <Card className="overflow-hidden border-2 border-gray-300 pt-0 h-[330px]">
      {/* Image */}
      <Skeleton className="w-full h-[230px]" />

      <CardHeader>
        {/* Title + Heart */}
        <div className="flex justify-between items-center mb-5">
          <Skeleton className="h-6 w-3/5" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        {/* Price */}
        <Skeleton className="h-6 w-20" />

        {/* Verified Badge */}
        <Skeleton className="h-8 w-24 rounded-full" />
      </CardContent>
    </Card>
  );
}