import React, { useEffect } from "react";
import { useCallContext } from "./hooks/useCallContext";

interface EnableSpeakerProps {
  children?: React.ReactNode;
}

export const EnableSpeaker: React.FC<EnableSpeakerProps> = ({ children }) => {
  const { clientId } = useCallContext();

  useEffect(() => {
    const playStreamsToSpeaker = () => {
      if (!clientId?.current) {
        console.warn("clientId is not available or has no current value.");
        return;
      }

      clientId.current.forEach((clientData, clientIdKey) => {
        if (!clientData || !clientData.connection) {
          console.warn(`No connection found for client: ${clientIdKey}`);
          return;
        }

        // Get all tracks from the remote connection
        const receivers = clientData.connection.getReceivers();
        const remoteStream = new MediaStream(
          receivers.map((receiver) => receiver.track).filter(Boolean)
        );

        if (remoteStream && remoteStream.getTracks().length > 0) {
          const audio = new Audio();
          audio.srcObject = remoteStream;
          audio.play().catch((err) => {
            console.error(
              `Failed to play audio for client: ${clientIdKey}`,
              err
            );
          });
          console.log(`Playing audio for client: ${clientIdKey}`);
        }
      });
    };

    playStreamsToSpeaker();
  }, [clientId]);

  return <div>{children}</div>;
};
