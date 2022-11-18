export const GET_NEO4J_DATAS = 'GET_NEO4J_DATAS';
export const SAVE_NEO4J_DATAS = 'SAVE_NEO4J_DATAS';

export const getNeo4jDatas = () => ({
    type: GET_NEO4J_DATAS
});

export const saveNeo4jDatas = (value) => ({
    type: SAVE_NEO4J_DATAS,
    value: value
});