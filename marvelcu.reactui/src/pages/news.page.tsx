import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import Post from "../components/newsRelated/post/post.component";
import newsService from "../services/news.service";
import { selectCurrentUser } from "../store/reducers/user.slice";
import { findElement } from "../utils/findElement";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SetStateAction, useState } from "react";
import DialogWindow from "../components/common/dialogWindow.component";
import INews from "../types/news/INews.mode";
import FormDialog from "../components/common/formDialog.component";
import UpdateNewsForm from "../components/newsRelated/updateNewsForm.component";

const NewsPage = () => {
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);
  const [deleteNews] = newsService.useDeleteNewsMutation();

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);

  const chooseNews = (news: INews) => {
    setSelectedNews(news);
  };

  const isAdmin =
    currentUser &&
    findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE);
  const { data } = newsService.useFetchNewsQuery();

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{ padding: theme.spacing(8, 0, 6) }}
    >
      <Typography component="h1" variant="h5" textAlign={"start"} mb={4}>
        News
      </Typography>
      <Grid container alignItems="center" flexDirection="column">
        {data &&
          data.map((el, i) => (
            <Container key={el.id} sx={{ width: "100%" }}>
              {isAdmin && (
                <Grid
                  container
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                >
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => {
                      chooseNews(el);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    component="span"
                    onClick={() => {
                      chooseNews(el);
                      setOpenUpdateForm(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              )}
              <Post
                title={el.title}
                content={el.content}
                postedDate={new Date(el.posted)}
              />
            </Container>
          ))}

        {isAdmin && selectedNews && (
          <>
            <Grid container alignItems="flex-end" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginY: 8, marginLeft: "auto" }}
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete
              </Button>
            </Grid>

            <DialogWindow
              open={openDeleteDialog}
              setOpen={setOpenDeleteDialog}
              title={`Delete news ${selectedNews?.title}`}
              context="Are you sure want to delete the news?"
              action={async () => {
                if (selectedNews) {
                  await deleteNews(selectedNews.id);
                }
              }}
            />

            <FormDialog
              open={openUpdateForm}
              setOpen={setOpenUpdateForm}
              title={""}
            >
              <UpdateNewsForm
                news={selectedNews}
                open={false}
                setOpen={setOpenUpdateForm}
              />
            </FormDialog>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default NewsPage;
