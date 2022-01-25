import { schedule, ScheduledTask } from "node-cron";
import ApolloClient, { ApolloQueryResult } from "apollo-boost";
import { DataProxy } from "apollo-cache";
import gql from "graphql-tag";
import "cross-fetch/polyfill";
import db from "../database";
import { config } from "dotenv";
import { IData, IResultItem, IPair } from "../interfaces";
import logger from "../logger";

config();

class FetchPairs {
    private client:ApolloClient<DataProxy>;
    
    constructor() {
        this.client = new ApolloClient({
            uri: process.env.UNISWAP_BASE_URL
        });
    }
    
    private async fetchFromSubgraph(lastId?:string):Promise<IData> {
        const { data }:ApolloQueryResult<IData> = await this.client.query({
            query: gql(`
                {
                    pairs(where: {id_gt: "${lastId}"}, first: 1000) {
                        id
                        token0{
                            id
                        }
                        token1{
                            id
                        }
                    }
                }
        `)})

        return data;
    }

    private async getAllPairs():Promise<IPair[]> {
        let allPairs:IPair[] = [];
        let lastId:string|null = '';

        while(lastId !== null) {
            let {pairs}:IData = await this.fetchFromSubgraph(lastId)
            let length:number = pairs.length

            if(length > 0) allPairs.push(...pairs)

            lastId = pairs[length - 1] ? pairs[length - 1].id : null;
        }

        return allPairs;
    }

    private async formatPairs(allPairs:IPair[]):Promise<IResultItem[]> {
        let result:IResultItem[] = allPairs.map(pair => {
            return {
                pair_id: pair.id,
                token0_id: pair.token0.id,
                token1_id: pair.token1.id
            }
        });
        return result;
    }
    
    private async insertToDb (data:IResultItem[]) {

        const trx = await db.transaction()

        await trx('pairs').insert(data)
            .onConflict('pair_id')
            .merge();
        
        await trx.commit();
    }

    public async start() {
        const fetchPairs:ScheduledTask = schedule('*/5 * * * *', async () => {
            try {
                logger.info('Started')

                let allPairs:IPair[] = await this.getAllPairs();
                let formattedPairs:IResultItem[] = await this.formatPairs(allPairs);
                await this.insertToDb(formattedPairs);

                logger.info('Stopped')
            } catch (error) {
                throw error;
            }
        }, {
            scheduled: true        
        })
        
        fetchPairs.start();
    }
}

export default new FetchPairs();