import { Box, Container, Tab, Tabs } from "@mui/material";
import * as React from "react";
import AddActorForm from "../components/actorRelated/addActorForm.component";

import TabPanel from "../components/tabPanel/tabPanel.component";
import AddMovieForm from "../components/movieRelated/addMovieForm.component";
import AddHeroForm from "../components/heroRelated/addHeroForm.component";
import AddNewsForm from "../components/newsRelated/addNewsForm.component";

export default function Admin() {
  const [tab, setTab] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container sx={{ mt: 8 }} maxWidth="lg">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Movie" />
            <Tab label="Hero" />
            <Tab label="Actor" />
            <Tab label="News" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <AddMovieForm />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <AddHeroForm />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <AddActorForm />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <AddNewsForm />
        </TabPanel>
      </Box>
    </Container>
  );
}
