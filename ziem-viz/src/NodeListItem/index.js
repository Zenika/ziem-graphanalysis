import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  debounce,
  Grid,
  Input,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useRef, useState } from "react";
import LinksList from "../LinkList";
import SelectCheckmarks from "../SelectCheckmarks";
import useNeo4jQuery from "../useNeo4jQuery";

const labelsOptions = ["Host", "Attacker", "Compromised"];

function updateQueryLabelsFromArray(nodeId, oldLabelsArray, newLabelsArray) {
  // Find differences
  // remove old labels that are not int the new labels
  // add all new labels
  const labelsToRemove = oldLabelsArray.filter(
    (label) => !newLabelsArray.includes(label)
  );
  const labelsToAdd = newLabelsArray.filter(
    (label) => !oldLabelsArray.includes(label)
  );
  const removeClause = labelsToRemove.length
    ? `REMOVE p:${labelsToRemove.join(":")} `
    : "";
  const setClause = labelsToAdd.length ? `SET p:${labelsToAdd.join(":")}` : "";
  return `MATCH (p) WHERE id(p) = ${nodeId} ${removeClause}${setClause} return p`;
}

export default function NodeListItem({ node }) {
  const runQuery = useNeo4jQuery();
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState(node.labels);
  const ref = useRef();

  debounce(() => console.log("ayaya debounce"), 1000)();

  useEffect(() => {
    ref.current &&
      ref.current.scrollIntoView({ behavior: "auto", block: "end" });
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      ref={ref}
      sx={{
        animationName: "flash",
        animationTimingFunction: "ease",
        animationDuration: "1s",
        animationIterationCount: "1",
      }}
    >
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
          sx={{
            textAlign: "left",
            paddingLeft: "20%",
          }}
        >
          <Grid item sm={2} sx={{ margin: "auto" }}>
            <Typography>identity</Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography>{node.identity}</Typography>
          </Grid>
          <Grid item sm={2} sx={{ margin: "auto" }}>
            <Typography>labels</Typography>
          </Grid>
          <Grid item sm={4}>
            <SelectCheckmarks
              options={labelsOptions}
              value={labels}
              handleChange={(event) => {
                event.preventDefault();
                const query = updateQueryLabelsFromArray(
                  node.identity,
                  labels,
                  event.target.value
                );
                runQuery(query)
                  .then((res) => setLabels(res.records[0].get(0).labels))
                  .catch((error) => console.warn("error:", error));
              }}
            />
          </Grid>
          <Grid item sm={2} sx={{ margin: "auto" }}>
            <Typography>desc</Typography>
          </Grid>
          <Grid item sm={4}>
            <TextField
              input={
                <Input
                  disableUnderline
                  fullWidth
                  inputProps={{ color: "inherit" }}
                />
              }
              multiline
              fullWidth
              maxRows={3}
              placeholder="Free text"
              onChange={(event) => console.log(event.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <Button variant="outlined">Add Property</Button>
          </Grid>
        </Grid>
        <LinksList links={Object.values(node.outLinks)} isOutgoing />
        <LinksList links={Object.values(node.inLinks)} isOutgoing={false} />
      </Collapse>
    </Box>
  );
}
