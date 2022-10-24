import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

import HeadingBg from "../../components/headingBg/headingBg.component";

const ActorsPage = () => {
  return (
    <HeadingBg
      bgImg={"/bgImg/actors.jpg"}
      title={"Actors"}
      Icon={TheaterComedyIcon}
    />
  );
};

export default ActorsPage;
