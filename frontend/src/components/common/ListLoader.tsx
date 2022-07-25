import { Skeleton } from "@chakra-ui/react";
import React from "react";

interface ListLoaderProps {
  count: number;
  height: string;
  width: string;
}

const ListLoader: React.FC<ListLoaderProps> = ({ count, height, width }) => {
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
export default ListLoader;
