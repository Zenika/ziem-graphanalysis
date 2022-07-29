import { Neo4jProvider, createDriver } from "use-neo4j";
import configData from "../config.json";
import { Neo4jContext } from "../Neo4jContext";

const driver = createDriver(
  "neo4j",
  "localhost",
  7687,
  configData.NEO4J_CLIENT_ID,
  configData.NEO4J_CLIENT_PWD
);

export default function Neo4jContextProvider({ children }) {
  return (
    <Neo4jProvider driver={driver}>
      <Neo4jContext.Provider value={{ driver: driver }}>
        {children}
      </Neo4jContext.Provider>
    </Neo4jProvider>
  );
}
