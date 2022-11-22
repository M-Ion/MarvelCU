import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { TranferListType } from "../../../hooks/useTransferLists.hook";
import { intersection, not } from "../../../utils/array.utils";
import { btnSx, paperSx } from "./styles";

export type ListItemType = {
  id: number;
  name: string;
};

interface TransferListProps<T extends ListItemType> {
  title: string;
  transferHook: TranferListType<T>;
}

function TransferList<T extends ListItemType>({
  title,
  transferHook,
}: TransferListProps<T>) {
  const {
    checkedState: [checked, setChecked],
    leftState: [left, setLeft],
    rightState: [right, setRight],
  } = transferHook;

  const leftChecked = intersection<T>(checked, left);
  const rightChecked = intersection<T>(checked, right);

  const handleToggle = (value: T) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: readonly T[]) => (
    <Paper sx={paperSx}>
      <List dense component="div" role="list">
        {items.map((value: T) => {
          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Box className="boxTL">
      <Typography>{title}</Typography>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={btnSx}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
            >
              ≫
            </Button>
            <Button
              sx={btnSx}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
            >
              &gt;
            </Button>
            <Button
              sx={btnSx}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
            >
              &lt;
            </Button>
            <Button
              sx={btnSx}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    </Box>
  );
}

export default TransferList;
