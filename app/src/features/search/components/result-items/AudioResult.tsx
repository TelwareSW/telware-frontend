import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { isValidDate } from "@utils/helpers";
import { getIcon } from "@data/icons";

const ItemWrapper = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const PlayPauseButton = styled(motion.button)`
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 3.125rem;
  height: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
`;

const DateSpan = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

const Preview = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
`;

interface AudioResultProps {
  title: string;
  date: string;
  duration?: string;
  file?: string;
}

const AudioResult: React.FC<AudioResultProps> = ({
  title,
  date,
  duration,
  file,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <ItemWrapper>
      <ImageWrapper>
        {file && (
          <>
            <PlayPauseButton
              onClick={togglePlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? getIcon("Pause") : getIcon("Play")}
            </PlayPauseButton>
            <audio ref={audioRef} src={file} onEnded={handleAudioEnded} />
          </>
        )}
      </ImageWrapper>
      <ContentWrapper>
        <ItemHeader>
          <Title>{title}</Title>
          <DateSpan>
            {isValidDate(date)
              ? new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </DateSpan>
        </ItemHeader>
        <Preview>
          {duration && <span>{duration} • </span>}
          {title}
        </Preview>
      </ContentWrapper>
    </ItemWrapper>
  );
};

export default AudioResult;
