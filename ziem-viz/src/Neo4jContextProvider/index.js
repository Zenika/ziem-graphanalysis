import { Neo4jProvider, createDriver } from "use-neo4j";
import { Neo4jContext } from "../Neo4jContext";

const driver = createDriver(
  "neo4j",
  process.env.REACT_APP_NEO4J_HOSTNAME,
  process.env.REACT_APP_NEO4J_PORT,
  process.env.REACT_APP_NEO4J_CLIENT_ID,
  process.env.REACT_APP_NEO4J_CLIENT_PWD
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
