import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("shold create log files if they not exists", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save logs in all-logs files", () => {
    const logDatSource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.ts",
    });

    logDatSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in all-logs files and medium", () => {
    const logDatSource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.ts",
    });

    logDatSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });
  test("should save a log in all-logs files and high", () => {
    const logDatSource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.ts",
    });

    logDatSource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDataSource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.low,
      origin: "file-system.datasource.ts",
    });
    const logMedium = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.medium,
      origin: "file-system.datasource.ts",
    });
    const logHigh = new LogEntity({
      message: "test message",
      level: LogSeverityLevel.high,
      origin: "file-system.datasource.ts",
    });


    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual( expect.arrayContaining([logLow, logMedium, logHigh]) )
    expect(logsMedium).toEqual( expect.arrayContaining([logMedium]) )
    expect(logsHigh).toEqual( expect.arrayContaining([logHigh]) )
  });
});
