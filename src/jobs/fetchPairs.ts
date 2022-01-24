import { schedule, ScheduledTask } from "node-cron";
import ApolloClient, { ApolloQueryResult } from "apollo-boost";
import gql from "graphql-tag";
import "cross-fetch/polyfill";
import db from "../database";
import { config } from "dotenv";
import { IData, IResultItem } from "../interfaces";
import logger from "../logger";

config();

const client = new ApolloClient({
    uri: process.env.UNISWAP_BASE_URL
});

const fetchPairs:ScheduledTask = schedule('*/1 * * * *', async () => {
    let lastId:string|null = '';
    let result:IResultItem[] = []
    
    try {
        while(lastId !== null) {
            const {data}:ApolloQueryResult<IData> = await client.query({
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

            let length:number = data.pairs.length

            if(length > 0) {
                let formattedData:IResultItem[] = data.pairs.map(datum => {
                    return {
                        pair_id: datum.id,
                        token0_id: datum.token0.id,
                        token1_id: datum.token1.id
                    }
                })
                result.push(...formattedData)
            }

            lastId = data.pairs[length - 1] ? 
                data.pairs[length - 1].id : 
                null;
            
            if(lastId === null) {
                await db('pairs').insert(result)
                    .onConflict('pair_id')
                    .ignore();
            };
        }
    } catch (error) {
        logger.info(error);
    }
}, {
    scheduled: true        
})

fetchPairs.start()

export default fetchPairs;