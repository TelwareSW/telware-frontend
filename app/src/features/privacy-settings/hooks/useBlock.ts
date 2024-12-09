import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getBlockList from "@features/privacy-settings/service/apiGetBlockList";
import { blockUser } from "../service/apiBlockUser";
import { BlockedUserProps } from "../BlockItem";
import { removeFromBlock } from "../service/apiRemoveFromBlocks";

export function useBlock() {
  const { data: blockList } = useQuery<BlockedUserProps[]>({
    queryKey: ["block"],
    queryFn: () => getBlockList(),
  });

  const queryClient = useQueryClient();
  const { mutateAsync: addToBlockList } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["block"] }),
  });

  const { mutateAsync: removeFromBlockList } = useMutation({
    mutationFn: removeFromBlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["block"] }),
  });

  return { blockList, addToBlockList, removeFromBlockList };
}
