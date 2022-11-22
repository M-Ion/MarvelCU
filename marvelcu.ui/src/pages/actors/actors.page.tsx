import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PageTitle from "../../components/commons/pageTitle";
import usePaging from "../../hooks/usePaging.hook";
import actorService from "../../services/entities/actor.service";
import { GetActor } from "../../types/entites/actor.types";
import { ReqProcessed } from "../../types/request.types";
import { gridSx, PageContainerStyled, paginationSx } from "../common.styles";
import { Op } from "../../types/enums/operations.enum";
import Search from "../../components/commons/search";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/store/slices/user.slice";
import { findIndex } from "../../utils/array.utils";
import InfoCard from "../../components/commons/infoCard";
import { Link } from "react-router-dom";
import AuthOnly from "../../components/commons/authOnly/authOnly";

const ActorsPage = () => {
  const [fetchFilteredActors, { isLoading }] =
    actorService.useGetFilteredActorEntitiesMutation();
  const {
    total,
    dataState: [data, setData],
    pagingState: [paging, setPaging],
    sortingState: [sorting],
    filtersState: [filters, setFilters],
  } = usePaging<GetActor>();

  const fecthActors = async () => {
    let request: ReqProcessed = { paging, sorting, filters };
    const response = await fetchFilteredActors(request).unwrap();

    setData(response.items);
    total.current = response.total;
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  useEffect(() => {
    fecthActors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters]);

  return (
    <Box component="main">
      <PageTitle
        img={"/bgImg/actors.jpg"}
        title={"Actors"}
        Icon={TheaterComedyIcon}
      />
      <PageContainerStyled maxWidth="lg" disableGutters>
        <Grid container alignItems="center" sx={gridSx}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={paginationSx}
          />
          <Search
            prop={"firstName"}
            operation={Op.Ct}
            filtersState={[filters, setFilters]}
          />
        </Grid>

        {isLoading ? (
          <Box className="flexCenter">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data.map((el) => (
              <Card key={el.id} dto={el} />
            ))}
          </Grid>
        )}
      </PageContainerStyled>
      <Footer />
    </Box>
  );
};

interface CardProps {
  dto: GetActor;
}

const Card: FC<CardProps> = ({ dto }) => {
  const user = useSelector(selectUser);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = actorService.useAddActorToFavouritesMutation();
  const [removeFromFavourites] =
    actorService.useRemoveActorFromFavouritesMutation();

  useEffect(() => {
    if (user) {
      const found = findIndex(user?.favouriteActors as GetActor[], dto);
      if (found > -1) setFavourite(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = async () => {
    if (favourite) {
      await removeFromFavourites(dto.id);
      setFavourite(false);
    } else {
      await addToFavourites(dto.id);
      setFavourite(true);
    }
  };

  return (
    <InfoCard blob={dto.blob} heading={dto.name} description={""}>
      <CardActions>
        <Button component={Link} to={`${dto.id}`} size="small">
          View
        </Button>
        <AuthOnly>
          <IconButton onClick={handleChange}>
            <FavoriteIcon color={favourite ? "secondary" : "primary"} />
          </IconButton>
        </AuthOnly>
      </CardActions>
    </InfoCard>
  );
};

export default ActorsPage;
