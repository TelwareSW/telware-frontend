import { useMutation } from "@tanstack/react-query";
import { apiChangeSettings } from "@features/privacy-settings/service/apiChangeSettings";

export function useUpdatePrivacy() {
  const { mutateAsync: updatePrivacy } = useMutation({
    mutationKey: ["privacy"],
    mutationFn: apiChangeSettings,
    onSuccess: () => {},
  });

  return updatePrivacy;
}
