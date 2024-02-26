import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoyImplementation } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fslogRepository = new LogRepositoyImplementation(
  new FileSystemDatasource()
);
const mongologRepository = new LogRepositoyImplementation(
  new MongoDatasource()
);
const postgreslogRepository = new LogRepositoyImplementation(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server start");
    
    // //? Enviar email
//    new SendEmailLogs(
//     emailService,
//     fileSystemLogRepository
//    ).execute([
//     'gonzalez.alan.cbtis37@gmail.com'
//    ])

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fslogRepository, mongologRepository, postgreslogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(`${url}`);
    });
  }
}

