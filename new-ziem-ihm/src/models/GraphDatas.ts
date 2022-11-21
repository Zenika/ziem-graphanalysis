export interface GraphDatas {
    nodes: unknown[];
    links: unknown[];
    utils: {
        countBoundRange: {
            min: number;
            max: number;
        };
    };
}