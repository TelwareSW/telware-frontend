import { useMutation } from "@tanstack/react-query";
import { changeSettings } from "@features/privacy-settings/service/changeSettings";

export function useUpdatePrivacy() {
  const { mutateAsync: updatePrivacy } = useMutation({
    mutationKey: ["privacy"],
    mutationFn: changeSettings,
    onSuccess: () => {},
  });

  return updatePrivacy;
}
