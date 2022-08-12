import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import moment from "moment";

export default function LinkDetailListItem({ link }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={link.identity} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid
          container
          spacing={2}
          columns={{ sm: 6 }}
          sx={{ textAlign: "left", paddingLeft: "15%" }}
        >
          <Grid item sm={3}>
            <Typography>type</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography>{link?.type}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography>createdAt</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography>{moment(link?.createdAt).format("DD MM YYYY hh:mm:ss")}</Typography>
          </Grid>          
        </Grid>
      </Collapse>
    </>
  );
}
