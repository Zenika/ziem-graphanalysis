import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import LinkDetailListItem from "../LinkDetailsListItem";
import { Box } from "@mui/system";

export default function LinkListItem({ link, isOutgoing = true }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const node = isOutgoing ? link.target : link.source;
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CircleIcon sx={{ color: node.color }} />
        </ListItemIcon>
        <ListItemText primary={node.properties.ip} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid
          container
          spacing={2}
          columns={{ sm: 6 }}
          sx={{ textAlign: "left", paddingLeft: "25%" }}
        >
          <Grid item sm={3}>
            <Typography>count</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography>{link?.count}</Typography>
          </Grid>
          <Grid item sm={6}>
            <Box>
              <Typography>details</Typography>
              <List>
                {Object.values(link.details).map((detail) => (
                  <LinkDetailListItem key={detail.identity} link={detail} />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
