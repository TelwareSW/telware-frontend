import { useMutation, useQuery } from "@tanstack/react-query";
import getBlockList from "@features/privacy-settings/service/getBlockList";

export function useBlock() {
  const { data: blockList } = useQuery({
    queryKey: ["block"],
    queryFn: () => getBlockList(),
  });

  return blockList;
}
