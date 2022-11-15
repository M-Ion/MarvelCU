const prepareUploadImgData = (
  files: FileList,
  fileName: string
): FormData | null => {
  if (files.length > 0) {
    const lastOne = files[files.length - 1];

    const data = new FormData();
    data.append(
      "file",
      lastOne,
      `${fileName}.${lastOne.name.split(".").pop()}`
    );

    return data;
  }
  return null;
};

export const verifyFileRef = (fileRef: React.RefObject<HTMLInputElement>) => {
  if (fileRef.current?.files) {
    if (fileRef.current.files.length > 0) return true;
  }

  return false;
};

export default prepareUploadImgData;
