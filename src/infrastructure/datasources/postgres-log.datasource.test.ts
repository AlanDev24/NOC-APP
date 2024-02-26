import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogSeverityLevel } from "../../domain/entities/log.entity";

describe("postgres-log.datasource", () => {
  const prismaClient = new PrismaClient();

  beforeEach(async () => {
    await prismaClient.logModel.deleteMany();
  });

  const levelFormat = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
  };

  const lowLog = {
    level: levelFormat.low as any,
    message: "low",
    origin: "postgres-log.datasource.ts",
  };
  const dataMedium = {
    level: levelFormat.medium as any,
    message: "medium",
    origin: "postgres-log.datasource.ts",
  };
  const dataHigh = {
    level: levelFormat.high as any,
    message: "high",
    origin: "postgres-log.datasource.ts",
  };

  test("should save a log in all logs files", async () => {
    const newLog = await prismaClient.logModel.create({
      data: lowLog,
    });
    

    expect(newLog).toEqual({
      id: expect.any(Number),
      message: "low",
      origin: "postgres-log.datasource.ts",
      level: "LOW",
      createdAt: expect.any(Date),
    });
  });

  test("should return logs from database", async () => {
    const newLog = await prismaClient.logModel.create({
      data: lowLog,
    });
    const newLog2 = await prismaClient.logModel.create({
      data: dataMedium,
    });
    const newLog3 = await prismaClient.logModel.create({
      data: dataHigh,
    });

    const lowLogs = await prismaClient.logModel.findMany({
      where: {
        level: "LOW",
      },
    });

    const mediumLogs = await prismaClient.logModel.findMany({
      where: {
        level: "MEDIUM",
      },
    });

    const highLogs = await prismaClient.logModel.findMany({
      where: {
        level: "HIGH",
      },
    });

    expect(lowLogs).toEqual([{
      id: expect.any(Number),
      message: 'low',
      origin: 'postgres-log.datasource.ts',
      level: 'LOW',
      createdAt: expect.any(Date)  
    }])
    expect(mediumLogs).toEqual([{
      id: expect.any(Number),
      message: 'medium',
      origin: 'postgres-log.datasource.ts',
      level: 'MEDIUM',
      createdAt: expect.any(Date)  
    }])
    expect(highLogs).toEqual([{
      id: expect.any(Number),
      message: 'high',
      origin: 'postgres-log.datasource.ts',
      level: 'HIGH',
      createdAt: expect.any(Date)  
    }])
  });
});
