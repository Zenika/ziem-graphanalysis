import { GraphDatas } from "../models/GraphDatas";

export const PARSE_NEO4J_DATAS_TO_GRAPH = 'PARSE_NEO4J_DATAS_TO_GRAPH';
export const SAVE_GRAPH_DATAS = 'SAVE_GRAPH_DATAS';
export const GRAPH_IS_READY = 'GRAPH_IS_READY';

export const parseNeo4jDatasToGraph = () => ({
    type: PARSE_NEO4J_DATAS_TO_GRAPH
});

export const saveGraphDatas = (value : GraphDatas) => ({
    type: SAVE_GRAPH_DATAS,
    value: value
});

export const graphIsReady = () => ({
    type: GRAPH_IS_READY,
    graphIsReady: true
});