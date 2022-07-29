import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import LinkListItem from "../LinkListItem";

export default function LinksList({ links, isOutgoing = true }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const label = `${isOutgoing ? "Outgoing links" : "Incoming Links"} (${
    links.length
  })`;
  return (
    <List sx={{ paddingLeft: "10%" }}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ShareIcon sx={{ color: isOutgoing ? "red" : "blue" }} />
        </ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ paddingLeft: "10%" }}>
          {links.map((link) => (
            <LinkListItem
              link={link}
              key={link.identity}
              isOutgoing={isOutgoing}
            />
          ))}
        </List>
      </Collapse>
    </List>
  );
}
