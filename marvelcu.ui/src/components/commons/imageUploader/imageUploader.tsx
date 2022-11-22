import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { btnSx, ContainerStyled } from "./styles";

interface ImageUploaderProps {
  fileState: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
  disabled: boolean;
}

const ImageUploader: FC<ImageUploaderProps> = ({ fileState, disabled }) => {
  const [file, setFile] = fileState;
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setSrc(url);
    } else setSrc(null);
  }, [file]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { files } = event.target;
    const isFile = Boolean(files && files.length > 0);

    if (isFile) {
      files = files as FileList;
      const lastIndex = files.length - 1;
      const lastUploaded: File = files[lastIndex];

      setFile(lastUploaded);
      return;
    }

    setFile(null);
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        sx={btnSx}
        disabled={disabled}
      >
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleChange} />
      </Button>

      {src && <ContainerStyled img={src} />}
    </>
  );
};

export default ImageUploader;
