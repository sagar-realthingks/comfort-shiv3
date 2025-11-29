import { Skeleton } from "@/components/ui/skeleton";

export const GalleryImageSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Skeleton className="w-full aspect-square" />
    </div>
  );
};
