import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { LeadsRepository } from '@app/database/repositories/leads.repository';
import { BadRequestException } from '@nestjs/common';

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: jest.Mocked<LeadsRepository>;

  const mockRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: LeadsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    repository = module.get(LeadsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE LEAD
  describe('createLead', () => {
    it('should create a lead successfully', async () => {
      const data = { name: 'Ali', title: 'Manager', source: 'web' };
      mockRepository.create.mockResolvedValue(data as any);

      const result = await service.createLead(data);

      expect(result).toEqual(data);
      expect(repository.create).toHaveBeenCalledWith(data);
    });

    it('should throw error if required fields missing', async () => {
      await expect(service.createLead({})).rejects.toThrow(BadRequestException);
    });
  });

  // ✅ GET BY ID
  describe('getLeadById', () => {
    it('should return a lead', async () => {
      const lead = { id: 1, name: 'Ali' };
      mockRepository.findOne.mockResolvedValue(lead as any);

      const result = await service.getLeadById(1);

      expect(result).toEqual(lead);
    });

    it('should throw error if lead not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getLeadById(1)).rejects.toThrow(
        'GET_LEAD_NOT_FOUND',
      );
    });
  });

  // ✅ GET ALL LEADS
  describe('getAllLeads', () => {
    it('should return paginated leads', async () => {
      const mockData = {
        rows: [{ id: 1 }, { id: 2 }],
        count: 2,
      };

      mockRepository.findAndCountAll.mockResolvedValue(mockData as any);

      const result = await service.getAllLeads({ page: 1, size: 10 });

      expect(result.data.length).toBe(2);
      expect(result.totalItems).toBe(2);
      expect(repository.findAndCountAll).toHaveBeenCalled();
    });
  });

  // ✅ UPDATE LEAD
  describe('updateLead', () => {
    it('should update lead successfully', async () => {
      const mockLead = {
        id: 1,
        update: jest.fn().mockResolvedValue(true),
      };

      mockRepository.findOne.mockResolvedValue(mockLead as any);

      const result = await service.updateLead({
        id: 1,
        name: 'Updated',
      });

      expect(mockLead.update).toHaveBeenCalledWith({ name: 'Updated' });
      expect(result).toEqual(mockLead);
    });

    it('should throw error if lead not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateLead({ id: 1 }),
      ).rejects.toThrow('UPDATE_LEAD_NOT_FOUND');
    });
  });

  // ✅ DELETE LEAD
  describe('deleteLead', () => {
    it('should delete lead successfully', async () => {
      mockRepository.delete.mockResolvedValue(true as any);

      const result = await service.deleteLead(1);

      expect(result).toEqual({ success: true });
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});