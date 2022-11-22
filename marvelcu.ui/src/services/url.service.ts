import axios from "axios";
import { fileExtension } from "../utils/string.utils";

export const urlToBlob = async (
  url: string,
  fileName: string
): Promise<File | null> => {
  const response = await axios.get(url, {
    responseType: "blob",
  });

  if (response.status === 200) {
    const imgFile = new File(
      [response.data],
      `${fileName}.${fileExtension(fileName)}`
    );

    return imgFile;
  }

  return null;
};
