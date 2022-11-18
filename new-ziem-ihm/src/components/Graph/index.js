
import { CircularProgress, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useReadCypher } from 'use-neo4j';
import graph from '../../assets/images/graph.png';

function Graph() {
    const dispatch = useDispatch();
    // eslint-disable-next-line quotes
    const query = `MATCH p=()-[r:TO]->() RETURN p;`;
    const {loading, records} = useReadCypher(query);

    // if (!loading && records != undefined) {
    //     console.log(loading, records);
    //     dispatch(records);
    // }


    return (
        loading ?
        <Stack width='75%' flex justifyContent='center' alignItems='center' >
            <CircularProgress size='300px' />
        </Stack>
        :
        <img src={graph} alt="graph" />
    );
}

export default Graph;