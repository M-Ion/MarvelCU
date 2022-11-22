import {
  Container,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent, useEffect, useState } from "react";
import newsService from "../../services/entities/news.service";
import { News } from "../../types/entites/news.types";
import { PageContainerStyled, paginationSx } from "../common.styles";
import ConfirmDialog from "../../components/commons/confirmDialog";
import ContainerDialog from "../../components/commons/containerDialog";
import UpdateNewsForm from "../../components/forms/news/update";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import NewsPost from "../../components/news";
import usePaging from "../../hooks/usePaging.hook";
import { ReqProcessed } from "../../types/request.types";
import { Op } from "../../types/enums/operations.enum";
import Search from "../../components/commons/search";
import { remove } from "../../utils/array.utils";

const NewsPage = () => {
  // const { data } = newsService.useFetchNewsEntitiesQuery();
  const [fetchFilteredNews] = newsService.useGetFilteredNewsEntitiesMutation();
  const [deleteNews] = newsService.useDeleteNewsEntityMutation();

  const [news, setNews] = useState<News | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const {
    total,
    dataState: [data, setData],
    pagingState: [paging, setPaging],
    sortingState: [sorting],
    filtersState: [filters, setFilters],
  } = usePaging<News>(3);

  const fetchNews = async () => {
    let request: ReqProcessed = { paging, sorting, filters };
    const response = await fetchFilteredNews(request).unwrap();

    setData(response.items);
    total.current = response.total;
  };

  useEffect(() => {
    if (data) setNews(data[0]);
  }, [data]);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters, sorting]);

  const handleSelectNews = (news: News) => {
    setNews(news);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  const Administration = (): JSX.Element => {
    const handleDeleteNews = async () => {
      if (news) {
        await deleteNews(news.id);
        setData(remove(data, news));
      }
    };

    return (
      <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
        <ConfirmDialog
          openState={[openDelete, setOpenDelete]}
          title={`Delete news ${news?.title}`}
          context="Are you sure want to delete the news?"
          fnc={handleDeleteNews}
        />

        {news && (
          <ContainerDialog openState={[openUpdate, setOpenUpdate]}>
            <UpdateNewsForm
              news={news}
              openState={[openUpdate, setOpenUpdate]}
              updateStateFnc={fetchNews}
            />
          </ContainerDialog>
        )}
      </AuthOnly>
    );
  };

  return (
    <PageContainerStyled maxWidth="lg" disableGutters>
      <Typography component="h1" variant="h5" textAlign={"start"} mb={4}>
        News
      </Typography>
      <Container disableGutters>
        <Pagination
          color="secondary"
          count={Math.ceil(total.current / (paging.pageSize as number))}
          onChange={handlePageChange}
          sx={paginationSx}
        ></Pagination>

        <Search
          prop={"title"}
          operation={Op.Ct}
          filtersState={[filters, setFilters]}
        />
      </Container>
      <Grid container alignItems="center" flexDirection="column">
        {data &&
          data.map((el, i) => (
            <Container key={el.id} sx={{ width: "100%" }}>
              <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
                <Grid
                  container
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                >
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => {
                      handleSelectNews(el);
                      setOpenDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    component="span"
                    onClick={() => {
                      setNews(el);
                      setOpenUpdate(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </AuthOnly>

              <NewsPost news={el} />
            </Container>
          ))}

        <Administration />
      </Grid>
    </PageContainerStyled>
  );
};

export default NewsPage;
