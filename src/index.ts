import "reflect-metadata";
import { startServer } from "./app";
import { connect } from "./config/typeorm";

async function main(){
    connect();
    const app = await startServer();
    app.listen(4000);
    console.log('Server on port', 4000);
}

main();