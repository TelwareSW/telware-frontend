import { decryptMessage, encryptMessage } from "../utils/helpers";

export const useEncryptDecrypt = () => {
  const decrypt = async (data: {
    message: string;
    key: string;
    iv: string;
  }) => {
    const { message, key, iv } = data;
    return await decryptMessage({
      encryptedMessageHex: message,
      keyHex: key,
      ivHex: iv,
    });
  };

  const encrypt = async (data: {
    message: string;
    key: string;
    iv: string;
  }) => {
    const { message, key, iv } = data;
    return await encryptMessage({
      message: message,
      keyHex: key,
      ivHex: iv,
    });
  };

  return { decrypt, encrypt };
};
