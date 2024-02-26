

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

           return true
            
        } catch (error) {
            throw error
        }
    }
}