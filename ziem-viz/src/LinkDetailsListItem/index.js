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
  //TODO : Régler le problème de la date UTC.
  console.log(moment(link?.createdAt))
  console.log(moment(Date.UTC(link?.createdAt)))
  console.log(new Date(link?.createdAt).setUTCHours())
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
            <Typography>{new Date(link?.createdAt).toLocaleString()}</Typography>
          </Grid>          
        </Grid>
      </Collapse>
    </>
  );
}
