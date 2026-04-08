import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '@app/repositories/company.repository';
import { Company } from '@app/models/company.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CompanyCreate, CompanyUpdate, CompanyObject, CompanyFilters } from '@app/common/interfaces/company.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { Op } from 'sequelize';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: CompanyRepository;

  const mockCompany: CompanyObject = {
    id: 1,
    name: 'Test Company',
    description: 'A test company description',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCompanyRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: CompanyRepository,
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<CompanyRepository>(CompanyRepository);

    jest.clearAllMocks();
  });

  describe('createCompany', () => {
    it('should create a company successfully when name is provided', async () => {
      const request: ApiRequest<CompanyCreate> = {
        userId: 999,
        data: {
          name: 'New Company',
          description: 'Some desc',
          status: 'active',
        },
      };

      mockCompanyRepository.create.mockResolvedValue(mockCompany);

      const result = await service.createCompany(request);

      expect(result).toEqual(mockCompany);
      expect(mockCompanyRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException if name is missing', async () => {
      const request: ApiRequest<CompanyCreate> = {
        userId: 999,
        data: {
          description: 'Some desc',
        } as CompanyCreate,
      };

      await expect(service.createCompany(request)).rejects.toThrow(BadRequestException);
      await expect(service.createCompany(request)).rejects.toThrow('CREATE_COMPANY_NAME_REQUIRED');
      expect(mockCompanyRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getCompanyById', () => {
    it('should return company when found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockCompanyRepository.findOne.mockResolvedValue(mockCompany);

      const result = await service.getCompanyById(request);

      expect(result).toEqual(mockCompany);
      expect(mockCompanyRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when company not found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockCompanyRepository.findOne.mockResolvedValue(null);

      await expect(service.getCompanyById(request)).rejects.toThrow(NotFoundException);
      await expect(service.getCompanyById(request)).rejects.toThrow('GET_COMPANY_NOT_FOUND');
    });
  });

  describe('listCompanies', () => {
    it('should return paginated companies with default values', async () => {
      const request: ApiRequest<Pagination<CompanyFilters>> = {
        userId: 999,
        data: { page: 1, size: 10 },
      };

      mockCompanyRepository.findAndCountAll.mockResolvedValue({
        rows: [mockCompany],
        count: 1,
      });

      const result = await service.listCompanies(request);

      expect(result).toEqual({
        data: [mockCompany],
        page: 1,
        totalPages: 1,
        totalItems: 1,
      });

      expect(mockCompanyRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          order: [['createdAt', 'DESC']],
          offset: 0,
          limit: 10,
        }),
      );
    });

    it('should apply search filter correctly', async () => {
      const request: ApiRequest<Pagination<CompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { search: 'test' },
        },
      };

      mockCompanyRepository.findAndCountAll.mockResolvedValue({
        rows: [],
        count: 0,
      });

      await service.listCompanies(request);

      const callArgs = mockCompanyRepository.findAndCountAll.mock.calls[0][0];
      expect(callArgs.where).toEqual({
        [Op.or]: [
          { name: { [Op.like]: '%test%' } },
          { description: { [Op.like]: '%test%' } },
        ],
      });
    });

    it('should apply status filter with single value', async () => {
      const request: ApiRequest<Pagination<CompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { status: 'active' },
        },
      };

      mockCompanyRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanies(request);

      expect(mockCompanyRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'active' },
        }),
      );
    });

    it('should apply status filter with array of values', async () => {
      const request: ApiRequest<Pagination<CompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { status: ['active', 'pending'] },
        },
      };

      mockCompanyRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanies(request);

      expect(mockCompanyRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: { [Op.in]: ['active', 'pending'] } },
        }),
      );
    });

    it('should apply date range filter', async () => {
      const request: ApiRequest<Pagination<CompanyFilters>> = {
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

      mockCompanyRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listCompanies(request);

      const callArgs = mockCompanyRepository.findAndCountAll.mock.calls[0][0];
      expect(callArgs.where.createdAt).toEqual({
        [Op.gte]: expect.any(Date),
        [Op.lte]: expect.any(Date),
      });
    });
  });

  describe('updateCompany', () => {
    it('should update company successfully', async () => {
      const request: ApiRequest<{ id: number; data: CompanyUpdate }> = {
        userId: 999,
        data: {
          id: 1,
          data: {
            name: 'Updated Name',
            description: 'New description',
          },
        },
      };

      mockCompanyRepository.update.mockResolvedValue(mockCompany);

      const result = await service.updateCompany(request);

      expect(result).toEqual(mockCompany);
      expect(mockCompanyRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        request.data.data,
      );
    });
  });

  describe('deleteCompany', () => {
    it('should delete company and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockCompanyRepository.delete.mockResolvedValue(true);

      const result = await service.deleteCompany(request);

      expect(result).toBe(true);
      expect(mockCompanyRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});