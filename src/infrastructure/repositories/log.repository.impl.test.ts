import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoyImplementation } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoyImplementation(mockLogDataSource);


  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the database with arguments", async () => {
    const log = {level: LogSeverityLevel.high, message: 'hola'} as LogEntity;

    await logRepository.saveLog(log)

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the database with arguments", async  () => {

    const severity = LogSeverityLevel.high
    await logRepository.getLogs(severity)

    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(severity)
  });
});
