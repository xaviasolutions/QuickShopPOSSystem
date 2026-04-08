import { Test, TestingModule } from '@nestjs/testing';
import { CompanyUserService } from './company-user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompanyUserRepository } from '@app/repositories/company-user.repository';
import { CompanyUser } from '@app/models/company_user.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyUserCreate, CompanyUserObject, CompanyUserFilters, CompanyUserRemove } from '@app/common/interfaces/company-user.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { Op } from 'sequelize';

describe('CompanyUserService', () => {
  let service: CompanyUserService;
  let companyUserRepository: CompanyUserRepository;

  const mockCompanyUser: CompanyUserObject = {
    id: 1,
    companyId: 100,
    userId: 200,
    isInitialAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCompanyUserRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    findAndCountAll: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyUserService,
        {
          provide: CompanyUserRepository,
          useValue: mockCompanyUserRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyUserService>(CompanyUserService);
    companyUserRepository = module.get<CompanyUserRepository>(CompanyUserRepository);


    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. createCompanyUser
  // ────────────────────────────────────────────────
  describe('createCompanyUser', () => {
    it('should create company-user successfully when companyId & userId provided', async () => {
      const request: ApiRequest<CompanyUserCreate> = {
        userId: 999, 
        data: {
          companyId: 100,
          userId: 200,
          isInitialAdmin: true,
        },
      };

      mockCompanyUserRepository.create.mockResolvedValue(mockCompanyUser);

      const result = await service.createCompanyUser(request);

      expect(result).toEqual(mockCompanyUser);
      expect(mockCompanyUserRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when companyId is missing', async () => {
      const request: ApiRequest<CompanyUserCreate> = {
        userId: 999,
        data: {
          userId: 200,
        } as CompanyUserCreate,
      };

      await expect(service.createCompanyUser(request)).rejects.toThrow(BadRequestException);
      await expect(service.createCompanyUser(request)).rejects.toThrow('CREATE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
      expect(mockCompanyUserRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when userId is missing', async () => {
      const request: ApiRequest<CompanyUserCreate> = {
        userId: 999,
        data: {
          companyId: 100,
        } as CompanyUserCreate,
      };

      await expect(service.createCompanyUser(request)).rejects.toThrow(BadRequestException);
      await expect(service.createCompanyUser(request)).rejects.toThrow('CREATE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
      expect(mockCompanyUserRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. getCompanyUserById
  // ────────────────────────────────────────────────
  describe('getCompanyUserById', () => {
    it('should return company-user when found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockCompanyUserRepository.findOne.mockResolvedValue(mockCompanyUser);

      const result = await service.getCompanyUserById(request);

      expect(result).toEqual(mockCompanyUser);
      expect(mockCompanyUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when not found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockCompanyUserRepository.findOne.mockResolvedValue(null);

      await expect(service.getCompanyUserById(request)).rejects.toThrow(NotFoundException);
      await expect(service.getCompanyUserById(request)).rejects.toThrow('GET_COMPANY_USER_NOT_FOUND');
    });
  });

  // ────────────────────────────────────────────────
  // 3. listByCompany
  // ────────────────────────────────────────────────
  describe('listByCompany', () => {
    it('should return all company-users for a given companyId', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 100,
      };

      mockCompanyUserRepository.findAll.mockResolvedValue([mockCompanyUser]);

      const result = await service.listByCompany(request);

      expect(result).toEqual([mockCompanyUser]);
      expect(mockCompanyUserRepository.findAll).toHaveBeenCalledWith({
        where: { companyId: 100 },
      });
    });

    it('should return empty array if no users found for company', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockCompanyUserRepository.findAll.mockResolvedValue([]);

      const result = await service.listByCompany(request);

      expect(result).toEqual([]);
    });
  });

  // ────────────────────────────────────────────────
  // 4. listByUser
  // ────────────────────────────────────────────────
  describe('listByUser', () => {
    it('should return all companies for a given userId', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 200,
      };

      mockCompanyUserRepository.findAll.mockResolvedValue([mockCompanyUser]);

      const result = await service.listByUser(request);

      expect(result).toEqual([mockCompanyUser]);
      expect(mockCompanyUserRepository.findAll).toHaveBeenCalledWith({
        where: { userId: 200 },
      });
    });
  });

  // ────────────────────────────────────────────────
  // 5. listCompanyUsers (paginated with filters)
  // ────────────────────────────────────────────────
  describe('listCompanyUsers', () => {
    it('should return paginated company-users with default pagination', async () => {
      const request: ApiRequest<Pagination<CompanyUserFilters>> = {
        userId: 999,
        data: { page: 1, size: 10 },
      };

      mockCompanyUserRepository.findAndCountAll.mockResolvedValue({
        rows: [mockCompanyUser],
        count: 1,
      });

      const result = await service.listCompanyUsers(request);

      expect(result).toEqual({
        data: [mockCompanyUser],
        page: 1,
        totalPages: 1,
        totalItems: 1,
      });
      expect(mockCompanyUserRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          order: [['createdAt', 'DESC']],
          offset: 0,
          limit: 10,
        }),
      );
    });

    it('should apply companyId filter', async () => {
      const request: ApiRequest<Pagination<CompanyUserFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { companyId: 100 },
        },
      };

      mockCompanyUserRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanyUsers(request);

      expect(mockCompanyUserRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { companyId: 100 },
        }),
      );
    });

    it('should apply userId filter', async () => {
      const request: ApiRequest<Pagination<CompanyUserFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { userId: 200 },
        },
      };

      mockCompanyUserRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanyUsers(request);

      expect(mockCompanyUserRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 200 },
        }),
      );
    });

    it('should apply isInitialAdmin filter', async () => {
      const request: ApiRequest<Pagination<CompanyUserFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { isInitialAdmin: true },
        },
      };

      mockCompanyUserRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanyUsers(request);

      expect(mockCompanyUserRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { isInitialAdmin: true },
        }),
      );
    });

    it('should apply date range filter', async () => {
      const request: ApiRequest<Pagination<CompanyUserFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: {
            dateFrom: '2025-01-01',
            dateTo: '2025-12-31',
          },
        },
      };

      mockCompanyUserRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanyUsers(request);

      const callArgs = mockCompanyUserRepository.findAndCountAll.mock.calls[0][0];
      expect(callArgs.where.createdAt).toEqual({
        [Op.gte]: expect.any(Date),
        [Op.lte]: expect.any(Date),
      });
    });
  });

  // ────────────────────────────────────────────────
  // 6. removeCompanyUser
  // ────────────────────────────────────────────────
  describe('removeCompanyUser', () => {
    it('should remove company-user successfully when companyId & userId provided', async () => {
      const request: ApiRequest<CompanyUserRemove> = {
        userId: 999,
        data: {
          companyId: 100,
          userId: 200,
        },
      };

      mockCompanyUserRepository.delete.mockResolvedValue(true);

      const result = await service.removeCompanyUser(request);

      expect(result).toBe(true);
      expect(mockCompanyUserRepository.delete).toHaveBeenCalledWith({
        where: { companyId: 100, userId: 200 },
      });
    });

    it('should throw BadRequestException when companyId is missing', async () => {
      const request: ApiRequest<CompanyUserRemove> = {
        userId: 999,
        data: {
          userId: 200,
        } as CompanyUserRemove,
      };

      await expect(service.removeCompanyUser(request)).rejects.toThrow(BadRequestException);
      await expect(service.removeCompanyUser(request)).rejects.toThrow('REMOVE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
      expect(mockCompanyUserRepository.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when userId is missing', async () => {
      const request: ApiRequest<CompanyUserRemove> = {
        userId: 999,
        data: {
          companyId: 100,
        } as CompanyUserRemove,
      };

      await expect(service.removeCompanyUser(request)).rejects.toThrow(BadRequestException);
      await expect(service.removeCompanyUser(request)).rejects.toThrow('REMOVE_COMPANY_USER_COMPANY_ID_AND_USER_ID_REQUIRED');
      expect(mockCompanyUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});