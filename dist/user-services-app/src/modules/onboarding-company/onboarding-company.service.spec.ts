import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingCompanyService } from './onboarding-company.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OnboardingCompanyRepository } from '@app/repositories/onboarding-company.repository';
import { OnboardingCompany } from '@app/models/onboarding-company.model';
import { OnboardingAttachment } from '@app/models/onboarding-attachment.model';
import { OnboardingVerification } from '@app/models/onboarding-verification.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingCompanyCreate, OnboardingCompanyUpdate, OnboardingCompanyObject, OnboardingCompanyFilters } from '@app/common/interfaces/onboarding.interface';
import type { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { Op } from 'sequelize';

describe('OnboardingCompanyService', () => {
  let service: OnboardingCompanyService;
  let onboardingCompanyRepository: OnboardingCompanyRepository;

  const mockOnboardingCompany: OnboardingCompanyObject = {
    id: 1,
    name: 'Test Company',
    userId: 100,
    city: 'Karachi',
    country: 'Pakistan',
    status: 'pending',
    isApproved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    attachments: [],
    verifications: [],
  };

  const mockRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingCompanyService,
        {
          provide: OnboardingCompanyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OnboardingCompanyService>(OnboardingCompanyService);
    onboardingCompanyRepository = module.get<OnboardingCompanyRepository>(OnboardingCompanyRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. createOnboardingCompany
  // ────────────────────────────────────────────────
  describe('createOnboardingCompany', () => {
    it('should create onboarding company successfully when name and userId provided', async () => {
      const request: ApiRequest<OnboardingCompanyCreate> = {
        userId: 999,
        data: {
          name: 'New Company',
          userId: 100,
          city: 'Lahore',
          country: 'Pakistan',
        },
      };

      mockRepository.create.mockResolvedValue(mockOnboardingCompany);

      const result = await service.createOnboardingCompany(request);

      expect(result).toEqual(mockOnboardingCompany);
      expect(mockRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when name is missing', async () => {
      const request: ApiRequest<OnboardingCompanyCreate> = {
        userId: 999,
        data: {
          userId: 100,
        } as OnboardingCompanyCreate,
      };

      await expect(service.createOnboardingCompany(request)).rejects.toThrow(BadRequestException);
      await expect(service.createOnboardingCompany(request)).rejects.toThrow('CREATE_ONBOARDING_COMPANY_NAME_AND_USER_REQUIRED');
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when userId is missing', async () => {
      const request: ApiRequest<OnboardingCompanyCreate> = {
        userId: 999,
        data: {
          name: 'New Company',
        } as OnboardingCompanyCreate,
      };

      await expect(service.createOnboardingCompany(request)).rejects.toThrow(BadRequestException);
      await expect(service.createOnboardingCompany(request)).rejects.toThrow('CREATE_ONBOARDING_COMPANY_NAME_AND_USER_REQUIRED');
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. getOnboardingCompanyById
  // ────────────────────────────────────────────────
  describe('getOnboardingCompanyById', () => {
    it('should return onboarding company with associations when found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockRepository.findOne.mockResolvedValue(mockOnboardingCompany);

      const result = await service.getOnboardingCompanyById(request);

      expect(result).toEqual(mockOnboardingCompany);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        include: [
          { model: OnboardingAttachment, as: 'attachments' },
          { model: OnboardingVerification, as: 'verifications' },
        ],
      });
    });

    it('should throw NotFoundException when onboarding company not found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getOnboardingCompanyById(request)).rejects.toThrow(NotFoundException);
      await expect(service.getOnboardingCompanyById(request)).rejects.toThrow('GET_ONBOARDING_COMPANY_NOT_FOUND');
    });
  });

  // ────────────────────────────────────────────────
  // 3. listOnboardingCompanies (paginated with filters)
  // ────────────────────────────────────────────────
  describe('listOnboardingCompanies', () => {
    it('should return paginated onboarding companies with default values', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: { page: 1, size: 10 },
      };

      mockRepository.findAndCountAll.mockResolvedValue({
        rows: [mockOnboardingCompany],
        count: 1,
      });

      const result = await service.listOnboardingCompanies(request);

      expect(result).toEqual({
        data: [mockOnboardingCompany],
        page: 1,
        totalPages: 1,
        totalItems: 1,
      });

      expect(mockRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          order: [['createdAt', 'DESC']],
          offset: 0,
          limit: 10,
          include: expect.any(Array),
        }),
      );
    });

    it('should apply search filter correctly', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { search: 'test' },
        },
      };

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      const callArgs = mockRepository.findAndCountAll.mock.calls[0][0];
      expect(callArgs.where).toEqual({
        [Op.or]: [
          { name: { [Op.like]: '%test%' } },
          { city: { [Op.like]: '%test%' } },
          { country: { [Op.like]: '%test%' } },
        ],
      });
    });

    it('should apply status filter (single)', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { status: 'approved' },
        },
      };

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      expect(mockRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'approved' },
        }),
      );
    });

    it('should apply status filter (array)', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { status: ['pending', 'approved'] },
        },
      };

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      expect(mockRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: { [Op.in]: ['pending', 'approved'] } },
        }),
      );
    });

    it('should apply userId filter', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { userId: 100 },
        },
      };

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      expect(mockRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 100 },
        }),
      );
    });

    it('should apply isApproved filter', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
        userId: 999,
        data: {
          page: 1,
          size: 10,
          filters: { isApproved: true },
        },
      };

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      expect(mockRepository.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { isApproved: true },
        }),
      );
    });

    it('should apply date range filter', async () => {
      const request: ApiRequest<Pagination<OnboardingCompanyFilters>> = {
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

      mockRepository.findAndCountAll.mockResolvedValue({ rows: [], count: 0 });

      await service.listOnboardingCompanies(request);

      const callArgs = mockRepository.findAndCountAll.mock.calls[0][0];
      expect(callArgs.where.createdAt).toEqual({
        [Op.gte]: expect.any(Date),
        [Op.lte]: expect.any(Date),
      });
    });
  });

  // ────────────────────────────────────────────────
  // 4. getOnboardingCompaniesByUser
  // ────────────────────────────────────────────────
  describe('getOnboardingCompaniesByUser', () => {
    it('should return all onboarding companies for a user', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 100,
      };

      const mockCompanies = [mockOnboardingCompany, { ...mockOnboardingCompany, id: 2 }];

      mockRepository.findAll.mockResolvedValue(mockCompanies);

      const result = await service.getOnboardingCompaniesByUser(request);

      expect(result).toEqual(mockCompanies);
      expect(result.length).toBe(2);
      expect(mockRepository.findAll).toHaveBeenCalledWith({
        where: { userId: 100 },
        order: [['createdAt', 'DESC']],
        include: expect.any(Array),
      });
    });

    it('should return empty array if no companies found for user', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 999,
      };

      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.getOnboardingCompaniesByUser(request);

      expect(result).toEqual([]);
      expect(mockRepository.findAll).toHaveBeenCalledWith({
        where: { userId: 999 },
        order: [['createdAt', 'DESC']],
        include: expect.any(Array),
      });
    });
  });

  // ────────────────────────────────────────────────
  // 5. approveOnboardingCompany
  // ────────────────────────────────────────────────
  describe('approveOnboardingCompany', () => {
    it('should approve onboarding company successfully', async () => {
      const request: ApiRequest<{ id: number; isApproved: boolean }> = {
        userId: 999,
        data: {
          id: 1,
          isApproved: true,
        },
      };

      mockRepository.update.mockResolvedValue(mockOnboardingCompany);

      const result = await service.approveOnboardingCompany(request);

      expect(result).toEqual(mockOnboardingCompany);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        { isApproved: true, status: 'approved' },
      );
    });

    it('should reject onboarding company successfully', async () => {
      const request: ApiRequest<{ id: number; isApproved: boolean }> = {
        userId: 999,
        data: {
          id: 1,
          isApproved: false,
        },
      };

      mockRepository.update.mockResolvedValue(mockOnboardingCompany);

      const result = await service.approveOnboardingCompany(request);

      expect(result).toEqual(mockOnboardingCompany);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        { isApproved: false, status: 'rejected' },
      );
    });
  });

  // ────────────────────────────────────────────────
  // 6. updateOnboardingCompany
  // ────────────────────────────────────────────────
  describe('updateOnboardingCompany', () => {
    it('should update onboarding company successfully', async () => {
      const request: ApiRequest<{ id: number; data: OnboardingCompanyUpdate }> = {
        userId: 999,
        data: {
          id: 1,
          data: {
            name: 'Updated Name',
            city: 'Islamabad',
          },
        },
      };

      mockRepository.update.mockResolvedValue(mockOnboardingCompany);

      const result = await service.updateOnboardingCompany(request);

      expect(result).toEqual(mockOnboardingCompany);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        request.data.data,
      );
    });
  });

  // ────────────────────────────────────────────────
  // 7. deleteOnboardingCompany
  // ────────────────────────────────────────────────
  describe('deleteOnboardingCompany', () => {
    it('should delete onboarding company and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockRepository.delete.mockResolvedValue(true);

      const result = await service.deleteOnboardingCompany(request);

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return false if onboarding company not found to delete', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockRepository.delete.mockResolvedValue(false);

      const result = await service.deleteOnboardingCompany(request);

      expect(result).toBe(false);
      expect(mockRepository.delete).toHaveBeenCalledWith({
        where: { id: 9999 },
      });
    });
  });
});