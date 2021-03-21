import express from "express";
import {ApolloServer, AuthenticationError} from "apollo-server-express";
import {buildSchema} from "type-graphql"
import { UserResolver } from "./resolvers/UserResolver";


export async function startServer(){
    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false
        }),
        context: ({req, res}) => {

            const token =req.headers.authorization || '';
            
            // const user = getUser(token);

            // if(!user) throw new AuthenticationError('you must be login');

            // return {user};
            
            return {req, res}
        }
    });

    server.applyMiddleware({app, path: '/graphql'});

    return app;
}


