import { Box, Container, Tab, Tabs } from "@mui/material";
import React from "react";
import AddActorForm from "../../components/forms/actor/add";
import AddHeroForm from "../../components/forms/hero/add";
import AddMovieForm from "../../components/forms/movie/add";
import AddNewsForm from "../../components/forms/news/add";
import TabPanel from "../../components/tabPanel";
import useAuth from "../../hooks/useAuth.hook";

const AdminPage = () => {
  const adminRole = process.env.REACT_APP_ADMIN_ROLE as string;
  useAuth([adminRole]);

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
};

export default AdminPage;
