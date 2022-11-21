
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReadCypher } from 'use-neo4j';
import { graphIsReady, saveGraphDatas } from '../../actions/graphDatas';
import neo4jDatasParsing from '../../utils/datasNeo4jToGraph';
import Graph from '../Graph';
import Header from '../Header';
import LeftPanel from '../LeftPanel';
import './style.css';

function App() {

  const dispatch = useDispatch();
  const { graphParameters } = useSelector((state) => state.graphDatas);
  const query = 'MATCH p=()-[r:TO]->() RETURN p;';
  const {loading, records} = useReadCypher(query);
  
  useEffect(() => {
    if(!loading && records != undefined) {
      const gDatas = neo4jDatasParsing(records, graphParameters);
      // console.log(gDatas);
      
      dispatch(saveGraphDatas(gDatas));
      dispatch(graphIsReady());
    }
  }, [records]);

  
  return (
    <div className='app'>
      <Header />
      <Box sx={{
        width: '95vw',
        height: '90vh',
        display: 'flex',
      }}>

        <LeftPanel />
        <Graph />
      </Box>
    </div>
  );
}

export default App;
