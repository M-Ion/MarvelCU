import { useFormik } from "formik";
import { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import newsService from "../../services/news.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import INews from "../../types/news/INews.mode";
import NewsForm, { Values } from "./form/newsForm.component";
import newsSchema from "./form/newsForm.validation";

type Props = {
  news: INews;
  open: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
};

const UpdateNewsForm: FC<Props> = ({ news, open, setOpen }) => {
  const dispatch = useDispatch();
  const [updateNews, { isLoading }] = newsService.useUpdateNewsMutation();
  const initialValues: Values = {
    title: news.title,
    content: news.content,
  };

  const handleSubmit = async (values: Values) => {
    updateNews({ id: news.id, body: values }).then(() => {
      dispatch(setAlert({ type: "success", message: "News updated" }));
    });
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      handleSubmit(values);
      setOpen(false);
      resetForm();
    },

    validationSchema: newsSchema,
  });
  return <NewsForm formik={formik} isLoading={isLoading} />;
};

export default UpdateNewsForm;
