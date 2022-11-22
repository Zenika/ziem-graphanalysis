import { GraphParameters } from '../models/GraphParameters';
import { Records } from '../models/Records';
import { Set } from '../models/Set';

export default function neo4jDatasParsing(records: Record<string, any>, graphParameters: GraphParameters) {
    interface node {
        identity: {
            high: number,
            low: number
        },
        labels: string[],
        properties: {ip: string}
    }

    function neo4jNodeToReactNode(node: node, id: {high: number, low: number}) {
        return {
        identity: id,
        outLinks: {},
        inLinks: {},
        labels: node.labels,
        properties: node.properties,
        };
    }

    function addNodeToSet(node: node, set: Set) {
        // console.log(node);
        const identity = node.identity;
        if (!set.identity) {
        set.identity = neo4jNodeToReactNode(node, identity);
        }
        return identity;
    }

    function computeParticleSpeedForLink(count: number, lowerBound: number, upperBound: number, min: number, max: number) {
        
    const normalizedCount = (count - min) / max;
    return lowerBound + normalizedCount * (upperBound - lowerBound);
    }


        let nodes: Set;
        const links = {};
        const countBoundRange = {
            min: 0,
            max: 1,
        };

        if (records) {
            records.forEach((linkData: Records) => {
            // console.log(linkData);
            const link = linkData.get(0).segments[0];
            // console.log(link);
            

            // Initializing and adding nodes to set
            const nodeStartId = addNodeToSet(link.start, nodes);
            const nodeEndId = addNodeToSet(link.end, nodes);
            console.log(nodeStartId, nodeEndId);
            

            // Initializing and adding links to set
            const identity = link.relationship.identity.toNumber();

            const currentLink = {
                identity: identity,
                type: link.relationship.type,
                createdAt: graphParameters.createdAt,
                source: nodes[link.start.identity.toNumber()],
                target: nodes[link.end.identity.toNumber()],
            };
            

            const wrapLink = {
                source: nodes[link.start.identity.toNumber()],
                target: nodes[link.end.identity.toNumber()],
                count: 1,
                identity: identity,
                details: [currentLink]
            };

            if (links[[link.start.identity.toNumber(), link.end.identity.toNumber()]]) {
                links[[link.start.identity.toNumber(), link.end.identity.toNumber()]].count += 1;
                links[[link.start.identity.toNumber(), link.end.identity.toNumber()]].details.push(currentLink);
            } else {
                links[[link.start.identity.toNumber(), link.end.identity.toNumber()]] = wrapLink;
            }

            if (!nodes[nodeStartId].outLinks[nodeEndId]) {
                nodes[nodeStartId].outLinks[nodeEndId] = wrapLink;
            }
            if (!nodes[nodeEndId].inLinks[nodeStartId]) {
                nodes[nodeEndId].inLinks[nodeStartId] = wrapLink;
            }
            });

            Object.values(nodes).forEach((node) => {
            Object.values(node.outLinks).forEach((link) => {
                console.log(link);
                
                if (link.count > countBoundRange.max) {
                countBoundRange.max = link.count;
                } else if (link.count < countBoundRange.min) {
                countBoundRange.min = link.count;
                }
            });
            Object.values(node.inLinks).forEach((link) => {
                if (link.count > countBoundRange.max) {
                countBoundRange.max = link.count;
                } else if (link.count < countBoundRange.min) {
                countBoundRange.min = link.count;
                }
            });
            });

            // Computing particle speed for each link
            Object.values(links).forEach((link) => {
            link.particleSpeed = computeParticleSpeedForLink(
                link.count,
                graphParameters.particleSpeedRange[0],
                graphParameters.particleSpeedRange[1],
                countBoundRange.min,
                countBoundRange.max
            );
            });
        }
        return {
            nodes: Object.values(nodes),
            links: Object.values(links),
            utils: { countBoundRange: countBoundRange },
        };
}