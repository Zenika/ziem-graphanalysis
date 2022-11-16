import { Box } from "@mui/system";
import { useReadCypher } from "use-neo4j";
import ForceGraph2D from "react-force-graph-2d";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  FormControlLabel,
  List,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import NodeListItem from "../NodeListItem";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import LinkListItem from "../LinkListItem";

const DEFAULT_GRAPH_PARAMETERS = {
  curvature: 0.2,
  particleSpeedRange: [0.005, 0.03],
  exteriorNodeOpacity: 0.2,
  showArrowHead: false,

  //! Test for DATE ----------------------------------------------------------
  createdAt: [1000000, 1000000000],
  //! ------------------------------------------------------------------------
};

function addAlpha(color, opacity) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

function neo4jNodeToReactNode(node, id) {
  return {
    identity: id,
    outLinks: {},
    inLinks: {},
    labels: node.labels,
    properties: node.properties,
  };
}

function addNodeToSet(node, set) {
  const identity = node.identity.toNumber();
  if (!set[identity]) {
    set[identity] = neo4jNodeToReactNode(node, identity);
  }
  return identity;
}

function computeParticleSpeedForLink(count, lowerBound, upperBound, min, max) {
  const normalizedCount = (count - min) / max;
  return lowerBound + normalizedCount * (upperBound - lowerBound);
}

//! Test for DATE ----------------------------------------------------------
function computeDateForLink(count, lowerBound, upperBound, min, max) {
  const normalizedCount = (count - min) / max;
  return lowerBound + normalizedCount * (upperBound - lowerBound);
}
//! ------------------------------------------------------------------------

function isNodeNeighbourWithinSet(node, nodesSet) {
  const outLinks = Object.values(node.outLinks);
  for (let i = 0; i < outLinks.length; ++i) {
    if (nodesSet[outLinks[i].target.identity]) {
      return true;
    }
  }
  const inLinks = Object.values(node.inLinks);
  for (let i = 0; i < inLinks.length; ++i) {
    if (nodesSet[inLinks[i].source.identity]) {
      return true;
    }
  }
  return false;
}

function hasNodeLinksInSet(node, linkSet) {
  const outLinks = Object.values(node.outLinks);
  for (let i = 0; i < outLinks.length; ++i) {
    if (linkSet[outLinks[i].identity]) {
      return true;
    }
  }
  const inLinks = Object.values(node.inLinks);
  for (let i = 0; i < inLinks.length; ++i) {
    if (linkSet[inLinks[i].identity]) {
      return true;
    }
  }
  return false;
}

function tabsDisplayStyle(index, tabsValue) {
  return index === tabsValue ? "flex" : "none";
}

export default function Neo4jGraphDisplay() {
  // App style variables
  const containerRef = useRef();
  const graphRef = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [tabsValue, setTabsValue] = useState(0);

  // Selection variables
  const [selectedNodes, setSelectedNodes] = useState({});
  const [selectedLinks, setSelectedLinks] = useState({});

  // Graph parameters settings
  const [graphParameters, setGraphParameters] = useState(
    DEFAULT_GRAPH_PARAMETERS
  );

  const query = `MATCH p=()-[r:TO]->() RETURN p;`;
  const { loading, records } = useReadCypher(query);

  const gData = useMemo(() => {
    const nodes = {};
    const links = {};
    const countBoundRange = {
      min: 0,
      max: 1,
    };

    if (!loading && records) {
      records.forEach((linkData) => {

        const link = linkData.get(0).segments[0];
        // console.log(link);
        // Initializing and adding nodes to set
        const nodeStartId = addNodeToSet(link.start, nodes);
        const nodeEndId = addNodeToSet(link.end, nodes);

        // Initializing and adding links to set
        const identity = link.relationship.identity.toNumber();
        const createdAt = link.relationship.properties.created_at;

        // console.log(createdAt.nanosecond.low)

        // const currentLink = {
        //   identity: identity,
        //   type: link.relationship.type,
        //   createdAt: createdAt,
        //   source: nodes[link.start.identity.toNumber()],
        //   target: nodes[link.end.identity.toNumber()],
        // }

        const currentLink = {
          identity: identity,
          type: link.relationship.type,
          createdAt: DEFAULT_GRAPH_PARAMETERS.createdAt,
          source: nodes[link.start.identity.toNumber()],
          target: nodes[link.end.identity.toNumber()],
        }

        const wrapLink = {
          source: nodes[link.start.identity.toNumber()],
          target: nodes[link.end.identity.toNumber()],
          count: 1,
          identity: identity,
          details: [currentLink]
        };

        if (links[[link.start.identity.toNumber(), link.end.identity.toNumber()]]) {
          links[[link.start.identity.toNumber(), link.end.identity.toNumber()]].count += 1;
          links[[link.start.identity.toNumber(), link.end.identity.toNumber()]].details.push(currentLink)
        } else {
          links[[link.start.identity.toNumber(), link.end.identity.toNumber()]] = wrapLink
        }

        if (!nodes[nodeStartId].outLinks[nodeEndId]) {
          nodes[nodeStartId].outLinks[nodeEndId] = wrapLink;
        }
        if (!nodes[nodeEndId].inLinks[nodeStartId]) {
          nodes[nodeEndId].inLinks[nodeStartId] = wrapLink;
        }
      });

      Object.values(nodes).forEach((node) => {
        Object.values(node.outLinks).forEach((link) => {
          if (link.count > countBoundRange.max) {
            countBoundRange.max = link.count;
          } else if (link.count < countBoundRange.min) {
            countBoundRange.min = link.count;
          }
        });
        Object.values(node.inLinks).forEach((link) => {
          if (link.count > countBoundRange.max) {
            countBoundRange.max = link.count;
          } else if (link.count < countBoundRange.min) {
            countBoundRange.min = link.count;
          }
        });
      });

      // Computing particle speed for each link
      Object.values(links).forEach((link) => {
        link.particleSpeed = computeParticleSpeedForLink(
          link.count,
          DEFAULT_GRAPH_PARAMETERS.particleSpeedRange[0],
          DEFAULT_GRAPH_PARAMETERS.particleSpeedRange[1],
          countBoundRange.min,
          countBoundRange.max
        );
      });
    }
    return {
      nodes: Object.values(nodes),
      links: Object.values(links),
      utils: { countBoundRange: countBoundRange },
    };
  }, [loading, records]);
  // console.log(gData);
  const nodeCanvasDraw = useCallback(
    (node, ctx, globalScale) => {
      const label = node.properties.ip;
      const fontSize = 18 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(
        (n) => n + fontSize * 0.2
      ); // some padding

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
      );

      // Selected nodes have a rectangle around their name
      if (selectedNodes[node.identity]) {
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1 / globalScale;
        ctx.strokeRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 1.3,
          ...bckgDimensions
        );
      }

      ctx.textAlign = "center";
      const alphaColor =
        !Object.values(selectedNodes).length ||
          selectedNodes[node.identity] ||
          isNodeNeighbourWithinSet(node, selectedNodes)
          ? 1
          : graphParameters.exteriorNodeOpacity;
      ctx.fillStyle = addAlpha(node.color, alphaColor);
      ctx.fillText(label, node.x, node.y);

      node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
    },
    [graphParameters.exteriorNodeOpacity, selectedNodes]
  );

  const nodePointerAreaPaint = useCallback((node, color, ctx) => {
    ctx.fillStyle = color;
    const bckgDimensions = node.__bckgDimensions;
    bckgDimensions &&
      ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
      );
  }, []);

  const selectNode = useCallback((node) => {
    setSelectedNodes((prev) => {
      const newList = { ...prev };
      newList[node.identity] = node;

      // Also adding all links to the selection
      setSelectedLinks((prev) => {
        const outLinks = Object.values(node.outLinks);
        for (let i = 0; i < outLinks.length; ++i) {
          if (!prev[outLinks[i].identity]) {
            prev[outLinks[i].identity] = outLinks[i];
          }
        }
        const inLinks = Object.values(node.inLinks);
        for (let i = 0; i < inLinks.length; ++i) {
          if (!prev[inLinks[i].identity]) {
            prev[inLinks[i].identity] = inLinks[i];
          }
        }
        return { ...prev };
      });

      return newList;
    });
  }, []);

  const unselectNode = useCallback(
    (node) => {
      setSelectedNodes((prev) => {
        const newList = { ...prev };
        delete newList[node.identity];

        // Also removing all links that are not connected to a selected node
        setSelectedLinks((prev) => {
          const outLinks = Object.values(node.outLinks);
          for (let i = 0; i < outLinks.length; ++i) {
            if (
              prev[outLinks[i].identity] &&
              !selectedNodes[outLinks[i].target.identity]
            ) {
              delete prev[outLinks[i].identity];
            }
          }
          const inLinks = Object.values(node.inLinks);
          for (let i = 0; i < inLinks.length; ++i) {
            if (
              prev[inLinks[i].identity] &&
              !selectedNodes[inLinks[i].source.identity]
            ) {
              delete prev[inLinks[i].identity];
            }
          }
          return { ...prev };
        });

        return newList;
      });
    },
    [selectedNodes]
  );

  const nodeOnClick = useCallback(
    (node, event) => {
      if (selectedNodes[node.identity]) {
        unselectNode(node);
      } else {
        selectNode(node);
      }
    },
    [selectedNodes, unselectNode, selectNode]
  );

  const linkOnClick = useCallback(
    (link, event) => {
      setSelectedLinks((prev) => {
        const newList = { ...prev };
        if (newList[link.identity]) {
          delete newList[link.identity];

          // Removing isolated nodes ie. nodes that do not have any selected links
          !hasNodeLinksInSet(link.source, newList) && unselectNode(link.source);
          !hasNodeLinksInSet(link.target, newList) && unselectNode(link.target);
        } else {
          newList[link.identity] = link;

          // Adding link edges to the selection
          const newSelectedNodes = { ...selectedNodes };
          newSelectedNodes[link.source.identity] = link.source;
          newSelectedNodes[link.target.identity] = link.target;
          setSelectedNodes(newSelectedNodes);
        }
        return newList;
      });
    },
    [selectedNodes, unselectNode]
  );

  useEffect(() => {
    setCanvasSize({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
  }, []);
  
  return loading ? null : (
    <Box
      component="div"
      sx={{
        width: "95vw",
        height: "95vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "25%",
          height: "100%",
          bgcolor: "#615d69",
          overflow: "auto",
        }}
      >
        <Tabs
          variant="fullWidth"
          value={tabsValue}
          textColor="inherit"
          onChange={(event, newValue) => setTabsValue(newValue)}
          sx={{ backgroundColor: "#43444d" }}
        >
          <Tab label="Setting" icon={<SettingsIcon />} />
          <Tab label="View" icon={<SearchIcon />} />
        </Tabs>
        <Stack
          spacing={2}
          sx={{ padding: "8px", display: tabsDisplayStyle(0, tabsValue) }}
        >
          <Box>
            <Typography>Curvature</Typography>
            <Slider
              value={graphParameters.curvature}
              step={0.05}
              min={0}
              max={1}
              valueLabelDisplay="auto"
              onChange={(event, newValue) =>
                setGraphParameters((prev) => ({ ...prev, curvature: newValue }))
              }
            />
          </Box>
          <Box>
            <Typography>Exterior Node Opacity</Typography>
            <Slider
              value={graphParameters.exteriorNodeOpacity}
              step={0.05}
              min={0.05}
              max={1}
              valueLabelDisplay="auto"
              onChange={(event, newValue) =>
                setGraphParameters((prev) => ({
                  ...prev,
                  exteriorNodeOpacity: newValue,
                }))
              }
            />
          </Box>
          <Box>
            <Typography>Particle speed range</Typography>
            <Slider
              value={graphParameters.particleSpeedRange}
              step={0.001}
              min={0.001}
              max={0.05}
              valueLabelDisplay="auto"
              onChange={(event, newValue) => {
                setGraphParameters((prev) => ({
                  ...prev,
                  particleSpeedRange: newValue,
                }));
                const [lower, upper] = newValue;
                const { min, max } = gData.utils.countBoundRange;
                gData.links.forEach((link) => {
                  link.particleSpeed = computeParticleSpeedForLink(
                    link.count,
                    lower,
                    upper,
                    min,
                    max
                  );
                });
              }}
            />
          </Box>

          {/* //! Test for DATE ---------------------------------------------------------- */}
          <Box>
            <Typography>Date</Typography>
            <Slider
              value={graphParameters.createdAt}
              step={1000000}
              min={1000000}
              max={1000000000}
              valueLabelDisplay="auto"
              onChange={(event, newValue) => {
                console.log(newValue);
                setGraphParameters((prev) => ({
                  ...prev,
                  createdAt: newValue,
                }));
                const [lower, upper] = newValue;
                const { min, max } = gData.utils.countBoundRange;
                gData.links.forEach((link) => {
                  link.createdAt = computeDateForLink(
                    link.count,
                    lower,
                    upper,
                    min,
                    max
                  );
                });
              }}
            />
          </Box>
          {/* //! ------------------------------------------------------------------------ */}

          <FormControlLabel
            sx={{ justifyContent: "center" }}
            onChange={(event, newValue) => {
              setGraphParameters((prev) => ({
                ...prev,
                showArrowHead: newValue,
              }));
            }}
            control={<Switch />}
            label="Show Arrow Head"
          />
        </Stack>
        <Stack
          spacing={2}
          sx={{ padding: "8px", display: tabsDisplayStyle(1, tabsValue) }}
        >
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "350px",
            }}
          >
            <Typography>Selected Nodes</Typography>
            <List>
              {Object.values(selectedNodes).map((node) => (
                <NodeListItem node={node} key={node.identity} />
              ))}
            </List>
          </Box>
          <Button
            variant="contained"
            disabled={
              !Object.values(selectedNodes).length &&
              !Object.values(selectedLinks).length
            }
            onClick={() => {
              setSelectedNodes({});
              setSelectedLinks({});
            }}
          >
            Clear Selection
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!Object.values(selectedNodes).length) {
                graphRef.current.zoomToFit(400);
              } else {
                graphRef.current.zoomToFit(
                  400,
                  10,
                  (node) =>
                    selectedNodes[node.identity] ||
                    isNodeNeighbourWithinSet(node, selectedNodes)
                );
              }
            }}
          >
            Focus on
          </Button>
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "350px",
            }}
          >
            <Typography>Selected Links</Typography>
            <List>
              {Object.values(selectedLinks).map((link) => (
                <LinkListItem key={link.identity} link={link} />
              ))}
            </List>
          </Box>
        </Stack>
      </Box>
      <Box
        ref={containerRef}
        sx={{
          width: "75%",
          height: "100%",
          bgcolor: "white",
        }}
      >
        <ForceGraph2D
          ref={graphRef}
          height={canvasSize.height}
          width={canvasSize.width}
          graphData={gData}
          nodeLabel="identity"
          nodeAutoColorBy="identity"
          linkCurvature={graphParameters.curvature}
          linkWidth={(link) => (selectedLinks[link.identity] ? 4 : 1)}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={(d) => d.particleSpeed}
          linkDirectionalParticleWidth={(link) =>
            !Object.values(selectedLinks).length || selectedLinks[link.identity]
              ? 2
              : 0
          }
          linkDirectionalArrowRelPos={1}
          linkDirectionalArrowLength={graphParameters.showArrowHead ? 3 : 0}
          linkLabel="count"
          onLinkClick={linkOnClick}
          onNodeClick={nodeOnClick}
          onNodeRightClick={(node, event) => console.log("ayayaa right click")}
          nodeCanvasObject={nodeCanvasDraw}
          nodePointerAreaPaint={nodePointerAreaPaint}
        />
      </Box>
    </Box>
  );
}
