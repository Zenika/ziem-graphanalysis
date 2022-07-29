import { Box, Typography } from "@mui/material";
import "./App.css";
import Neo4jContextProvider from "./Neo4jContextProvider";
import Neo4jGraphDisplay from "./Neo4jGraphDisplay";
import NeovisDisplay from "./NeovisDisplay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Neo4jContextProvider>
          <Typography> Test d'affichage de graphe Neo4j</Typography>
          <Box sx={{ marginBottom: "10px" }}>
            <Neo4jGraphDisplay />
          </Box>
          <NeovisDisplay />
        </Neo4jContextProvider>
      </header>
    </div>
  );
}

export default App;
