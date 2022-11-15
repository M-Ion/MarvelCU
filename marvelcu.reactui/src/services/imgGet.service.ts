import axios from "axios";

export const getImgFileByUrl = async (
  url: string,
  fileName: string
): Promise<File | null> => {
  const response = await axios.get(url, {
    responseType: "blob",
  });

  if (response.status === 200) {
    const imgFile = new File(
      [response.data],
      `${fileName}.${url.split(".").pop()}`
    );

    return imgFile;
  }

  return null;
};
