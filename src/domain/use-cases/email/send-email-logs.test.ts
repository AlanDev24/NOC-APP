import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs",  () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };
  const sendEmailService = new SendEmailLogs(
    mockEmailService as any,
    mockRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call sendEmail and savelog', async ()=> {

      const result = await sendEmailService.execute('alanfga1@gmail.com')
    
      expect(result).toBe(true);
      expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
      expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        {createdAt :expect.any(Date), level: 'low', message: expect.any(String), origin: 'send-email-logs.ts'}
      );
  })
  test('should log in case of error', async ()=> {
    
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);   
    
      const result = await sendEmailService.execute('alanfga1@gmail.com')
    
      expect(result).toBe(false);
      expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
      expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        {createdAt :expect.any(Date), level: 'high', message: expect.any(String), origin: 'send-email-logs.ts'}
      );
  })
});
