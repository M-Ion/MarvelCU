import GroupsIcon from "@mui/icons-material/Groups";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";

import Footer from "../components/footer/footer.component";
import HeadingBg from "../components/common/headingBg/headingBg.component";
import heroService from "../services/hero.service";
import IGetHero from "../types/hero/IGetHero.mode";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import Op from "../types/processing/Op";
import SearchBar from "../components/common/searchBar/searchBar.component";
import usePagingReques from "../hooks/usePaging.hook";
import HeroCard from "../components/heroRelated/heroCard/heroCard.component";

const HeroesPage = () => {
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
  } = usePagingReques<IGetHero>();

  const [fetchFilteredData, { isLoading }] =
    heroService.useGetFilteredHeroesMutation();

  const fetchHeroes = async () => {
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
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  return (
    <Box>
      <HeadingBg
        bgImg={"/bgImg/heroes.jpg"}
        title={"Heroes"}
        Icon={GroupsIcon}
      />
      {/* Content */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Grid container alignItems="center" sx={{ gap: 5 }}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={{ marginBottom: 2 }}
          />
          <SearchBar
            prop={"name"}
            operation={Op.Ct}
            filters={filters}
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
            {data.map((el, index) => (
              <HeroCard key={index} dto={el} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default HeroesPage;
