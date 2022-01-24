# Labrinth

## Task
- Create a nodejs server using TypeScript

- Create a database to store data, it can be any kind of database which you are familiar with and it can have three columns: pair, token0 and token1

- Fetch data from a Subgraph and store them in a database
 - Fetch data from Uniswap subgraph, you can find it here: https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2 
 - Queries (HTTP): https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2

 - You can check their documentation if you are not familiar with subgraph, you have to use graph explorer not studio https://thegraph.com/docs/en/developer/querying-from-your-app

- You need to fetch pair addresses from uniswap subgraph and token0, token1 address and store them in database, you can find the query listed on this page under heading “All pairs in Uniswap” https://docs.uniswap.org/protocol/V2/reference/API/queries#all-pairs-in-uniswap

- You will need to edit the query given in uniswap documentation and add token0 id and token1 id additionally along with pair id which is already included in it

- Periodically fetch data from these subgraph and synchronize data in the db, this period could be once in 30 mins, so the nodejs backend server will fetch data every 30 mins and store in database

## Installation
- Clone the Repo
```bash
    git clone https://github.com/prince-curie/labrinth.git
```

- Change directory into the project folder directory
```bash
    cd labrinth
```

- Install dependencies
```npm
    npm install
```

## Run
To run the Application, 
- Copy the file from the `.emv.example` file, create a `.env` file, paste and update the file.
-  Run the command
```bash
    npm run dev
```