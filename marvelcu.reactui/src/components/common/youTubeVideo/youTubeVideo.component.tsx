import { FC } from "react";

import { StyledDiv, StyledFrame } from "./youTubeVideo.styles";

type Props = {
  sourceId: string;
};

const YouTubeVideo: FC<Props> = ({ sourceId }) => {
  return (
    <StyledDiv className="video-responsive">
      <StyledFrame
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src={`https://www.youtube.com/embed/v=${sourceId}`}
        title="Embedded youtube"
      />
    </StyledDiv>
  );
};

export default YouTubeVideo;
