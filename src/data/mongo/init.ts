

interface ConnectionOptions{
    mongoUrl: string;
    dbName: string;
}

import mongoose from "mongoose";


export class MongoDatabase {

    static async connect(options: ConnectionOptions){
        const {mongoUrl, dbName} = options;

        try {

            await mongoose.connect(mongoUrl, {
                dbName,
            });

            console.log('Mongo connected successfully')
            
        } catch (error) {
            console.log('Mongo connection failed')
            throw error
        }
    }
}