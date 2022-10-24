import GroupsIcon from "@mui/icons-material/Groups";

import HeadingBg from "../../components/headingBg/headingBg.component";

const HeroesPage = () => {
  return (
    <HeadingBg bgImg={"/bgImg/heroes.jpg"} title={"Actors"} Icon={GroupsIcon} />
  );
};

export default HeroesPage;
