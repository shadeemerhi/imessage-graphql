import { Skeleton } from "@chakra-ui/react";
import React from "react";

interface SkeletonLoaderProps {
  count: number;
  height: string;
  width: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count,
  height,
  width,
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.300"
          height={height}
          width={width}
          borderRadius={4}
        />
      ))}
    </>
  );
};
export default SkeletonLoader;
