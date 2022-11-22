import { useFormik } from "formik";
import React, { FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import newsService from "../../../services/entities/news.service";
import { setSuccessFeedback } from "../../../services/store/slices/feedback.slice";
import { News } from "../../../types/entites/news.types";
import NewsBaseForm, { NewsBaseFormValues } from "./form";
import newsValidSchema from "./validation";

interface UpdateNewsFormProps {
  news: News;
  openState: [boolean, (value: SetStateAction<boolean>) => void];
  updateStateFnc?: Function;
}

const UpdateNewsForm: FC<UpdateNewsFormProps> = ({
  news: { id, title, content },
  openState,
  updateStateFnc,
}) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOpen] = openState;

  const [updateNews, { isLoading }] = newsService.useUpdateNewsEntityMutation();

  const initialValues: NewsBaseFormValues = {
    title,
    content,
  };

  const handleSubmit = async (values: NewsBaseFormValues) => {
    await updateNews({ id, entity: values });
    if (updateStateFnc) updateStateFnc();

    dispatch(setSuccessFeedback("News entity updated"));
    setOpen(false);
  };

  const formik = useFormik<NewsBaseFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: newsValidSchema,
  });

  return <NewsBaseForm formik={formik} loading={isLoading} />;
};

export default UpdateNewsForm;
