import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import newsService from "../../../services/entities/news.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import NewsBaseForm, { NewsBaseFormValues } from "./form";
import newsValidSchema from "./validation";

const initialValues: NewsBaseFormValues = {
  title: "",
  content: "",
};

const AddNewsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createNews, { isLoading }] = newsService.useCreateNewsEntityMutation();

  const handleSubmit = async (values: NewsBaseFormValues) => {
    await createNews(values);

    dispatch(setSuccessFeedback("Add news entity"));
    setTimeout(() => {
      navigate(`/news`);
    }, 1000); // 1s
  };

  const formik = useFormik<NewsBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: newsValidSchema,
  });
  return <NewsBaseForm formik={formik} loading={isLoading} />;
};

export default AddNewsForm;
