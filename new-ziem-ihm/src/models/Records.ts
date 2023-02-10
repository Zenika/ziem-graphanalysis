export interface Records {

    _fieldLookup: {p: number },
    _fields: {
        end: {
            identity: {
                high: number,
                low: number
            },
            labels: string[],
            properties: {ip: string}
        },
        segments: {
            end: {
                identity: {
                    high: number,
                    low: number
                },
                labels: string[],
                properties: {ip: string}
            },
            relationship: {
                end: {
                    high: number,
                    low: number
                },
                identity: {
                    high: number,
                    low: number
                },
                properties: {
                    created_at: { 
                        day: { high: number, low: number }
                        hour:  { high: number, low: number }
                        minute:  { high: number, low: number }
                        month:  { high: number, low: number }
                        nanosecond:  { high: number, low: number }
                        second:  { high: number, low: number }
                        timeZoneId: undefined
                        timeZoneOffsetSeconds:  { high: number, low: number }
                        year:  { high: number, low: number }
                    }
                },
                start: {
                    low: number,
                    high: number
                },
                type: string
            },
            start: {
                identity: {
                    low: number,
                    high: number
                },
                labels: string[],
                properties: {ip: string}
            }
        }[],
        start: {
            identity: {
                low: number,
                high: number
            },
            labels: string[],
            properties: {ip: string}
        }
    }[],
    keys: string[]

}[];