export interface Set {
    identity: number,
    inLinks: {
        count: number,
        details: {
            createdAt: undefined,
            identity: number,
            source: {
                identity: number,
                inLinks: Record<string, never>,
                labels: string[],
                outLinks: Record<string, never>,
                properties: { ip: string}
            },
            target: Record<string, never>,
            type: string
        }[],
        identity: number,
        particleSpeed: number,
        source: Record<string, never>,
        target: Record<string, never>
    },
    labels: string[],
    outLinks: {
        15: {
            count: number,
            details: {
                createdAt: undefined,
                identity: number,
                source: {
                    identity: number,
                    inLinks: Record<string, never>,
                    labels: string[],
                    outLinks: Record<string, never>,
                    properties: { ip: string}
                },
                target: Record<string, never>,
                type: string
            }[],
            identity: number,
            particleSpeed: number,
            source: Record<string, never>,
            target: Record<string, never>
        },
        16: {
            count: number,
            details: {
                createdAt: undefined,
                identity: number,
                source: {
                    identity: number,
                    inLinks: Record<string, never>,
                    labels: string[],
                    outLinks: Record<string, never>,
                    properties: { ip: string}
                },
                target: Record<string, never>,
                type: string
            }[],
            identity: number,
            particleSpeed: number,
            source: Record<string, never>,
            target: Record<string, never>
        }
    },
    porperties: {ip: string}
}