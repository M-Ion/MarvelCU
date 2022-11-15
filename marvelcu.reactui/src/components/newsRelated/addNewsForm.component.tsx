import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import newsService from "../../services/news.service";
import { setAlert } from "../../store/reducers/alerts.slice";
import NewsForm, { Values } from "./form/newsForm.component";
import newsSchema from "./form/newsForm.validation";

const initialValues: Values = {
  title: "",
  content: "",
};

const AddNewsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postNews, { isLoading }] = newsService.usePostNewsMutation();

  const handleSubmit = async (values: Values) => {
    postNews(values)
      .unwrap()
      .then(() => {
        dispatch(setAlert({ type: "success", message: "News added" }));
        navigate("/news");
      });
  };

  const formik = useFormik<Values>({
    initialValues,

    onSubmit: async (values: Values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },

    validationSchema: newsSchema,
  });
  return <NewsForm formik={formik} isLoading={isLoading} />;
};

export default AddNewsForm;
