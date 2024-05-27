import pg from 'pg';
const { Client } = pg

export class Postgress{
    client:any
    constructor(){
        const client = new Client({
            user:"postgres",
            password:"postgres",
            host:"localhost",
            port:5432,
            database:"db"
        })

        this.client = client;
    }

    async init(){
        const res = await this.client.connect();
        return res;
    }

    async query(query:string,arr:any=null){
        if(Array.isArray(arr)){
            return this.client.query(query,arr);
        }
        return this.client.query(query);
    }

    async end(){
        await this.client.end();
    }
}