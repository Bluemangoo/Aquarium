export interface Query {
    version?: string;
    type?: string;
    source?: string;
}

export type GetVersion = (query: Query) => Promise<string>
export type GetUrl = (query: Query) => Promise<string>