
import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReadCypher } from 'use-neo4j';
import { saveNeo4jDatas } from '../../actions/neo4jDatas';

// import graph from '../../assets/images/graph.png';

function Graph() {
    const dispatch = useDispatch();
    const query = 'MATCH p=()-[r:TO]->() RETURN p;';
    const {loading, records} = useReadCypher(query);
    
    if(!loading && records != undefined) {
        dispatch(saveNeo4jDatas(records));
    }

    // const {datas} = useSelector((state) => state.neo4jDatas);
    // useEffect(() => {
    //     console.log(datas);
    // }, []);

    return (
 
        <Stack width='75%' flex justifyContent='center' alignItems='center' >
            <CircularProgress size='300px' />
        </Stack>
        
        // <img src={graph} alt="graph" />
    );
}

export default Graph;