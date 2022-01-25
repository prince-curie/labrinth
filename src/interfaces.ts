interface IToken {
    id: string,
    __typename: string
}

export interface IPair {
    id: string,
    token0: IToken,
    token1: IToken,
    __typename: string
}

export interface IData {
    pairs: IPair[]
}

export interface IResultItem {
    pair_id: string,
    token0_id: string,
    token1_id: string
}