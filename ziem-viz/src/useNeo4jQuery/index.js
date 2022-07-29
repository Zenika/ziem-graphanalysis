import { useContext } from "react";
import { Neo4jContext } from "../Neo4jContext";

export default function useNeo4jQuery() {
  const neo4jContext = useContext(Neo4jContext);
  const session = neo4jContext.driver.session();
  const queryDB = async (query, parameters = {}) => {
    try {
      const result = await session.run(query, parameters);
      return result;
    } finally {
      await session.close();
    }
  };
  return queryDB;
}
