import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoyImplementation } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoyImplementation(
  new FileSystemDatasource()
)

export class Server {
  public static start() {
    console.log("Server start");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(`${url}`);
    });
  }
}
