import React, { FC } from "react";
import { DivStyled, FrameStyled } from "./styles";

interface YouTubePlayerProps {
  source: string;
}

const YouTubePlayer: FC<YouTubePlayerProps> = ({ source }) => {
  const src = `https://www.youtube-nocookie.com/embed/${source}`;

  return (
    <DivStyled>
      <FrameStyled
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src={src}
        title="YouTube player"
      />
    </DivStyled>
  );
};

export default YouTubePlayer;
