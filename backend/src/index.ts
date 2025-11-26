import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { typeDefs as gqlTypeDefs, resolvers as gqlResolvers } from './gql';
import { expressMiddleware } from '@apollo/server/express4';

console.log(process.env);

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
}));


async function startServer() {
    const apolloServer = new ApolloServer({ typeDefs: gqlTypeDefs, resolvers: gqlResolvers })
    await apolloServer.start();

    app.use('/graphql', express.json(), expressMiddleware(apolloServer))

    const PORT = process.env.PORT || 3001;

    app.get('/', (req: Request, res: Response) => {
        res.json({ "test": "boo" });
    });

    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });

}

startServer();