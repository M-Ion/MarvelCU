import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { News } from "../../types/entites/news.types";

type NewsPostProps = {
  news: News;
};

const NewsPost: FC<NewsPostProps> = ({ news: { title, content, posted } }) => {
  const theme = useTheme();
  const postedDate = new Date(posted);

  const month: string = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(postedDate);
  const date = `${postedDate.getDate()} ${month}, ${postedDate.getFullYear()}`;

  return (
    <Grid item sx={{ width: "100%" }}>
      <Grid container flexDirection={"column"} alignItems="flex-start">
        <Typography variant="h5" gutterBottom>
          {title.toUpperCase()}
        </Typography>
        <Typography variant={"subtitle1"}>{date}</Typography>

        <Divider sx={{ width: "100%" }} />

        <p style={{ padding: theme.spacing(3, 0), textAlign: "start" }}>
          {content}
        </p>
      </Grid>
    </Grid>
  );
};

export default NewsPost;
