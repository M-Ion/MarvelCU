import { Checkbox } from "@mui/material";
import { ChangeEvent, FC, SetStateAction, useEffect, useState } from "react";
import IFilter from "../../../types/processing/IFilter.model";
import { FormController } from "./checkBoxFilter.styles";

type Props = {
  filter: IFilter;
  filters: IFilter[];
  label: string;
  onChecked: (value: SetStateAction<IFilter[]>) => void;
};

const CheckBoxFilter: FC<Props> = ({ filter, filters, label, onChecked }) => {
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    const found = filters.find(
      (el) => JSON.stringify(el) === JSON.stringify(filter)
    );

    if (found) setCheck(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Verify checked before click
    if (!check) {
      onChecked([...filters, filter]);
    } else if (check) {
      // eslint-disable-next-line eqeqeq
      const index = filters.findIndex(
        (el) => JSON.stringify(el) === JSON.stringify(filter)
      );

      if (index > -1) {
        let copyFilters = [...filters];
        copyFilters.splice(index, 1);
        onChecked(copyFilters);
      }
    }

    setCheck(!check);
  };

  return (
    <FormController
      control={<Checkbox checked={check} onChange={handleChange} />}
      label={label}
    />
  );
};

export default CheckBoxFilter;
