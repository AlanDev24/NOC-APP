import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { LogModel } from "./data/mongo";
import { MongoDatabase } from "./data/mongo/init";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });


  const prisma = new PrismaClient();

  
  //? leer los logs
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'HIGH'
  //   }
  // });
  // console.log(logs);

  //?Crear un nuevo log
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test message',
  //     origin: 'App.ts'
  //   }
  // })


  //?crear una coleccion
  // const newLog = await LogModel.create({
  //     message: 'test message',
  //     origin: 'app.ts,',
  //     level: 'low'
  // });

  // await newLog.save();
  // console.log(newLog)

  //?obtener los logs
  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
}
