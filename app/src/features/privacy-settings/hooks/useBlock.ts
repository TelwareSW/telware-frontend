import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiGetBlockList from "@features/privacy-settings/service/apiGetBlockList";
import { apiBlockUser } from "../service/apiBlockUser";
import { BlockedUserProps } from "../BlockItem";
import { apiRemoveFromBlock } from "../service/apiRemoveFromBlocks";

export function useBlock() {
  const { data: blockList } = useQuery<BlockedUserProps[]>({
    queryKey: ["block"],
    queryFn: () => apiGetBlockList(),
  });

  const queryClient = useQueryClient();
  const { mutateAsync: addToBlockList } = useMutation({
    mutationFn: apiBlockUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["block"] }),
  });

  const { mutateAsync: removeFromBlockList } = useMutation({
    mutationFn: apiRemoveFromBlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["block"] }),
  });

  return { blockList, addToBlockList, removeFromBlockList };
}
