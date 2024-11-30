import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/uploadfileHandler";

export function useUploadMedia() {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: uploadFile,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error uploading file:", errorMessage);
    },
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
    },
  });

  return { mutate, isPending, error, data };
}
