
import { CircularProgress, Stack } from '@mui/material';
import { useRef } from 'react';
import ReactForceGraph2d from 'react-force-graph-2d';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Graph() {

    const {
        // graphParameters,
        gDatas,
        graphIsReady
    } = useSelector((state: RootState) => state.graphDatas);

    //* ajout de graphParameters ici au lieu du reducer (state) pour tester
    //TODO remettre le graphparameters dans le reducer, probleme de typage never.
    const graphParameters = {
        curvature: 0.2,
        particleSpeedRange: [0.005, 0.03],
        exteriorNodeOpacity: 0.2,
        showArrowHead: false,
      };

    const graphRef = useRef();

    return (
        <Stack
            width='75%'
            // flex
            justifyContent='center'
            alignItems='center'
        >
            {
                graphIsReady
                ?
                    <ReactForceGraph2d 
                    ref={graphRef}
                    // height={canvasSize.height}
                    // width={canvasSize.width}
                    graphData={gDatas}
                    nodeLabel="identity"
                    nodeAutoColorBy="identity"
                    linkCurvature={graphParameters.curvature}
                    // linkWidth={(link) => (selectedLinks[link.identity] ? 4 : 1)}
                    linkDirectionalParticles={2}
                    linkDirectionalParticleSpeed={(d: any) => d.particleSpeed}
                    // linkDirectionalParticleWidth={(link) =>
                    //   !Object.values(selectedLinks).length || selectedLinks[link.identity]
                    //     ? 2
                    //     : 0
                    // }
                    linkDirectionalArrowRelPos={1}
                    linkDirectionalArrowLength={graphParameters.showArrowHead ? 3 : 0}
                    linkLabel="count"
                    // onLinkClick={linkOnClick}
                    // onNodeClick={nodeOnClick}
                    // onNodeRightClick={(node, event) => console.log("ayayaa right click")}
                    // nodeCanvasObject={nodeCanvasDraw}
                    // nodePointerAreaPaint={nodePointerAreaPaint}
                    />
                :
                    <CircularProgress size='300px' />
            }
        </Stack>

    );
}

export default Graph;