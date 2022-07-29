import Box from "@mui/material/Box";
import NeoVis from "neovis.js";
import { useEffect, useRef } from "react";
import configData from "../config.json";

export default function NeovisDisplay() {
  const containerRef = useRef(null);
  useEffect(() => {
    const config = {
      containerId: containerRef.current.id,
      neo4j: {
        serverUrl: configData.NEO4J_SERVER_URL,
        serverUser: configData.NEO4J_CLIENT_ID,
        serverPassword: configData.NEO4J_CLIENT_PWD,
      },
      visConfig: {
        nodes: {},
        edges: {
          arrows: {
            to: { enabled: true },
          },
        },
      },

      labels: {
        Host: {
          label: "ip",
          group: "type_connection",
        },
      },
      relationships: {
        TO: {
          value: "count",
          community: "type_connection",
        },
      },
      arrows: true,
      initialCypher: "MATCH p=()-[r:TO]->() RETURN p;",
    };
    const vis = new NeoVis(config);
    vis.render();
  }, []);
  return (
    <Box
      id={"vizbox"}
      ref={containerRef}
      component="div"
      sx={{ width: "80vw", height: "80vh", bgcolor: "white" }}
    />
  );
}
