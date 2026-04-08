import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingVerificationService } from './onboarding-verification.service';
import { BadRequestException } from '@nestjs/common';
import { OnboardingVerificationRepository } from '@app/repositories/onboarding-verification.repository';
import { OnboardingVerification } from '@app/models/onboarding-verification.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingVerificationCreate, OnboardingVerificationUpdate, OnboardingVerificationObject } from '@app/common/interfaces/onboarding.interface';

describe('OnboardingVerificationService', () => {
  let service: OnboardingVerificationService;
  let onboardingVerificationRepository: OnboardingVerificationRepository;

  // ایک dummy verification آبجیکٹ (mock response کے لیے)
  const mockVerification: OnboardingVerificationObject = {
    id: 1,
    onboardingId: 100,
    columnName: 'companyRegistration',
    value: 'ABC123456',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // repository کے methods کو mock کر رہے ہیں
  const mockOnboardingVerificationRepository = {
    create: jest.fn(),
    bulkCreate: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingVerificationService,
        {
          provide: OnboardingVerificationRepository,
          useValue: mockOnboardingVerificationRepository,
        },
      ],
    }).compile();

    service = module.get<OnboardingVerificationService>(OnboardingVerificationService);
    onboardingVerificationRepository = module.get<OnboardingVerificationRepository>(OnboardingVerificationRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. createVerification
  // ────────────────────────────────────────────────
  describe('createVerification', () => {
    it('should create verification successfully when required fields provided', async () => {
      const request: ApiRequest<OnboardingVerificationCreate> = {
        userId: 999,
        data: {
          onboardingId: 100,
          columnName: 'companyRegistration',
          value: 'ABC123456',
          status: 'pending',
        },
      };

      mockOnboardingVerificationRepository.create.mockResolvedValue(mockVerification);

      const result = await service.createVerification(request);

      expect(result).toEqual(mockVerification);
      expect(mockOnboardingVerificationRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when onboardingId missing', async () => {
      const request: ApiRequest<OnboardingVerificationCreate> = {
        userId: 999,
        data: {
          columnName: 'companyRegistration',
          value: 'ABC123456',
        } as OnboardingVerificationCreate,
      };

      await expect(service.createVerification(request)).rejects.toThrow(BadRequestException);
      await expect(service.createVerification(request)).rejects.toThrow('CREATE_VERIFICATION_REQUIRED_FIELDS_MISSING');
      expect(mockOnboardingVerificationRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when columnName missing', async () => {
      const request: ApiRequest<OnboardingVerificationCreate> = {
        userId: 999,
        data: {
          onboardingId: 100,
          value: 'ABC123456',
        } as OnboardingVerificationCreate,
      };

      await expect(service.createVerification(request)).rejects.toThrow(BadRequestException);
      await expect(service.createVerification(request)).rejects.toThrow('CREATE_VERIFICATION_REQUIRED_FIELDS_MISSING');
      expect(mockOnboardingVerificationRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. bulkCreateVerifications
  // ────────────────────────────────────────────────
  describe('bulkCreateVerifications', () => {
    it('should bulk create verifications successfully when data provided', async () => {
      const request: ApiRequest<OnboardingVerificationCreate[]> = {
        userId: 999,
        data: [
          {
            onboardingId: 100,
            columnName: 'companyRegistration',
            value: 'ABC123',
            status: 'pending',
          },
          {
            onboardingId: 100,
            columnName: 'taxCertificate',
            value: 'TAX456',
            status: 'pending',
          },
        ],
      };

      const mockCreated = [mockVerification, { ...mockVerification, id: 2 }];

      mockOnboardingVerificationRepository.bulkCreate.mockResolvedValue(mockCreated);

      const result = await service.bulkCreateVerifications(request);

      expect(result).toEqual(mockCreated);
      expect(result.length).toBe(2);
      expect(mockOnboardingVerificationRepository.bulkCreate).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when data is empty array', async () => {
      const request: ApiRequest<OnboardingVerificationCreate[]> = {
        userId: 999,
        data: [],
      };

      await expect(service.bulkCreateVerifications(request)).rejects.toThrow(BadRequestException);
      await expect(service.bulkCreateVerifications(request)).rejects.toThrow('BULK_CREATE_VERIFICATION_DATA_REQUIRED');
      expect(mockOnboardingVerificationRepository.bulkCreate).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when data is undefined', async () => {
      const request: ApiRequest<OnboardingVerificationCreate[]> = {
        userId: 999,
        data: undefined as any,
      };

      await expect(service.bulkCreateVerifications(request)).rejects.toThrow(BadRequestException);
      await expect(service.bulkCreateVerifications(request)).rejects.toThrow('BULK_CREATE_VERIFICATION_DATA_REQUIRED');
      expect(mockOnboardingVerificationRepository.bulkCreate).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 3. getVerificationsByOnboardingId
  // ────────────────────────────────────────────────
  describe('getVerificationsByOnboardingId', () => {
    it('should return all verifications for a given onboardingId', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 100,
      };

      const mockVerifications = [
        mockVerification,
        { ...mockVerification, id: 2, columnName: 'taxCertificate' },
      ];

      mockOnboardingVerificationRepository.findAll.mockResolvedValue(mockVerifications);

      const result = await service.getVerificationsByOnboardingId(request);

      expect(result).toEqual(mockVerifications);
      expect(result.length).toBe(2);
      expect(mockOnboardingVerificationRepository.findAll).toHaveBeenCalledWith({
        where: { onboardingId: 100 },
        order: [['createdAt', 'DESC']],
      });
    });

    it('should return empty array if no verifications found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 999,
      };

      mockOnboardingVerificationRepository.findAll.mockResolvedValue([]);

      const result = await service.getVerificationsByOnboardingId(request);

      expect(result).toEqual([]);
      expect(mockOnboardingVerificationRepository.findAll).toHaveBeenCalledWith({
        where: { onboardingId: 999 },
        order: [['createdAt', 'DESC']],
      });
    });
  });

  // ────────────────────────────────────────────────
  // 4. updateVerification
  // ────────────────────────────────────────────────
  describe('updateVerification', () => {
    it('should update verification successfully', async () => {
      const request: ApiRequest<{ id: number; data: OnboardingVerificationUpdate }> = {
        userId: 999,
        data: {
          id: 1,
          data: {
            value: 'UpdatedValue123',
            status: 'verified',
          },
        },
      };

      mockOnboardingVerificationRepository.update.mockResolvedValue(mockVerification);

      const result = await service.updateVerification(request);

      expect(result).toEqual(mockVerification);
      expect(mockOnboardingVerificationRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        request.data.data,
      );
    });
  });

  // ────────────────────────────────────────────────
  // 5. deleteVerification
  // ────────────────────────────────────────────────
  describe('deleteVerification', () => {
    it('should delete verification and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockOnboardingVerificationRepository.delete.mockResolvedValue(true);

      const result = await service.deleteVerification(request);

      expect(result).toBe(true);
      expect(mockOnboardingVerificationRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return false if verification not found to delete', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockOnboardingVerificationRepository.delete.mockResolvedValue(false);

      const result = await service.deleteVerification(request);

      expect(result).toBe(false);
      expect(mockOnboardingVerificationRepository.delete).toHaveBeenCalledWith({
        where: { id: 9999 },
      });
    });
  });
});