
export default function neo4jDatasParsing(records, graphParameters) {

    function neo4jNodeToReactNode(node, id) {
        return {
        identity: id,
        outLinks: {},
        inLinks: {},
        labels: node.labels,
        properties: node.properties,
        };
    }

    function addNodeToSet(node, set) {
        const identity = node.identity.toNumber();
        if (!set[identity]) {
        set[identity] = neo4jNodeToReactNode(node, identity);
        }
        return identity;
    }

    function computeParticleSpeedForLink(count, lowerBound, upperBound, min, max) {
    const normalizedCount = (count - min) / max;
    return lowerBound + normalizedCount * (upperBound - lowerBound);
    }


        const nodes = {};
        const links = {};
        const countBoundRange = {
            min: 0,
            max: 1,
        };

        if (records) {
            records.forEach((linkData) => {

            const link = linkData.get(0).segments[0];
            // console.log(link);
            // Initializing and adding nodes to set
            const nodeStartId = addNodeToSet(link.start, nodes);
            const nodeEndId = addNodeToSet(link.end, nodes);

            // Initializing and adding links to set
            const identity = link.relationship.identity.toNumber();
            // const createdAt = link.relationship.properties.created_at;

            // console.log(createdAt.nanosecond.low)

            // const currentLink = {
            //   identity: identity,
            //   type: link.relationship.type,
            //   createdAt: createdAt,
            //   source: nodes[link.start.identity.toNumber()],
            //   target: nodes[link.end.identity.toNumber()],
            // }

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