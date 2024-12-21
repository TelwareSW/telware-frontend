import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/uploadfileHandler";
import toast from "react-hot-toast";

export function useUploadMedia() {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: uploadFile,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error("Error uploading file: " + errorMessage);
      console.error("Error uploading file:", errorMessage);
    },
    onSuccess: (data) => {
      toast.success("File uploaded successfully");
      console.log("File uploaded successfully:", data);
    },
  });

  return { mutate, isPending, error, data };
}
