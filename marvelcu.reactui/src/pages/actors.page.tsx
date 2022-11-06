import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

import ActorCard from "../components/actorCard/actorCard.component";
import actorService from "../services/actor.service";
import HeadingBg from "../components/common/headingBg/headingBg.component";
import IGetActor from "../types/actor/IGetActor.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import usePagingReques from "../hooks/usePaging.hook";
import SearchBar from "../components/common/searchBar/searchBar.component";
import Op from "../types/processing/Op";
import Footer from "../components/footer/footer.component";

const ActorsPage = () => {
  const theme = useTheme();
  const {
    total,
    data,
    setData,
    paging,
    setPaging,
    sorting,
    filters,
    setFilters,
  } = usePagingReques<IGetActor>();

  const [fetchFilteredData, { isLoading }] =
    actorService.useGetFilteredActorsMutation();

  const fecthActors = async () => {
    let request: IProcessedRequest = { paging, sorting, filters };

    await fetchFilteredData(request)
      .unwrap()
      .then((data) => {
        const { items, pageIndex, pageSize } = data;

        // Set paging
        setPaging({ pageIndex, pageSize });

        // Set items
        setData(items);

        // Total number of items
        total.current = data.total;
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fecthActors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  return (
    <Box component="main">
      <HeadingBg
        bgImg={"/bgImg/actors.jpg"}
        title={"Actors"}
        Icon={TheaterComedyIcon}
      />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Grid container alignItems="flex-start" sx={{ gap: 2 }}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={{ marginBottom: 2 }}
          />
          <SearchBar
            filters={filters}
            operation={Op.Ct}
            prop="firstName"
            setFilters={setFilters}
          />
        </Grid>

        {/*  Items grid */}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data.map((el) => (
              <ActorCard key={el.id} dto={el} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ActorsPage;
