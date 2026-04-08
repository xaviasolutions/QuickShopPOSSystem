import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingAttachmentService } from './onboarding-attachment.service';
import { BadRequestException } from '@nestjs/common';
import { OnboardingAttachmentRepository } from '@app/repositories/onboarding-attachment.repository';
import { OnboardingAttachment } from '@app/models/onboarding-attachment.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { OnboardingAttachmentCreate, OnboardingAttachmentObject } from '@app/common/interfaces/onboarding.interface';

describe('OnboardingAttachmentService', () => {
  let service: OnboardingAttachmentService;
  let onboardingAttachmentRepository: OnboardingAttachmentRepository;

  // ایک dummy attachment آبجیکٹ (mock response کے لیے)
  const mockAttachment: OnboardingAttachmentObject = {
    id: 1,
    onboardingId: 100,
    documentName: 'resume.pdf',
    url: 'https://example.com/resume.pdf',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // repository کے methods کو mock کر رہے ہیں
  const mockOnboardingAttachmentRepository = {
    create: jest.fn(),
    bulkCreate: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingAttachmentService,
        {
          provide: OnboardingAttachmentRepository,
          useValue: mockOnboardingAttachmentRepository,
        },
      ],
    }).compile();

    service = module.get<OnboardingAttachmentService>(OnboardingAttachmentService);
    onboardingAttachmentRepository = module.get<OnboardingAttachmentRepository>(OnboardingAttachmentRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. createAttachment
  // ────────────────────────────────────────────────
  describe('createAttachment', () => {
    it('should create attachment successfully when required fields provided', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate> = {
        userId: 999,
        data: {
          onboardingId: 100,
          documentName: 'resume.pdf',
          url: 'https://example.com/resume.pdf',
        },
      };

      mockOnboardingAttachmentRepository.create.mockResolvedValue(mockAttachment);

      const result = await service.createAttachment(request);

      expect(result).toEqual(mockAttachment);
      expect(mockOnboardingAttachmentRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when onboardingId missing', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate> = {
        userId: 999,
        data: {
          documentName: 'resume.pdf',
          url: 'https://example.com/resume.pdf',
        } as OnboardingAttachmentCreate,
      };

      await expect(service.createAttachment(request)).rejects.toThrow(BadRequestException);
      await expect(service.createAttachment(request)).rejects.toThrow('CREATE_ATTACHMENT_REQUIRED_FIELDS_MISSING');
      expect(mockOnboardingAttachmentRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when documentName missing', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate> = {
        userId: 999,
        data: {
          onboardingId: 100,
          url: 'https://example.com/resume.pdf',
        } as OnboardingAttachmentCreate,
      };

      await expect(service.createAttachment(request)).rejects.toThrow(BadRequestException);
      await expect(service.createAttachment(request)).rejects.toThrow('CREATE_ATTACHMENT_REQUIRED_FIELDS_MISSING');
      expect(mockOnboardingAttachmentRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when url missing', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate> = {
        userId: 999,
        data: {
          onboardingId: 100,
          documentName: 'resume.pdf',
        } as OnboardingAttachmentCreate,
      };

      await expect(service.createAttachment(request)).rejects.toThrow(BadRequestException);
      await expect(service.createAttachment(request)).rejects.toThrow('CREATE_ATTACHMENT_REQUIRED_FIELDS_MISSING');
      expect(mockOnboardingAttachmentRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. bulkCreateAttachments
  // ────────────────────────────────────────────────
  describe('bulkCreateAttachments', () => {
    it('should bulk create attachments successfully when data provided', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate[]> = {
        userId: 999,
        data: [
          {
            onboardingId: 100,
            documentName: 'resume1.pdf',
            url: 'https://example.com/resume1.pdf',
          },
          {
            onboardingId: 100,
            documentName: 'resume2.pdf',
            url: 'https://example.com/resume2.pdf',
          },
        ],
      };

      const mockCreated = [mockAttachment, { ...mockAttachment, id: 2 }];

      mockOnboardingAttachmentRepository.bulkCreate.mockResolvedValue(mockCreated);

      const result = await service.bulkCreateAttachments(request);

      expect(result).toEqual(mockCreated);
      expect(result.length).toBe(2);
      expect(mockOnboardingAttachmentRepository.bulkCreate).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when data is empty array', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate[]> = {
        userId: 999,
        data: [],
      };

      await expect(service.bulkCreateAttachments(request)).rejects.toThrow(BadRequestException);
      await expect(service.bulkCreateAttachments(request)).rejects.toThrow('BULK_CREATE_ATTACHMENT_DATA_REQUIRED');
      expect(mockOnboardingAttachmentRepository.bulkCreate).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when data is undefined', async () => {
      const request: ApiRequest<OnboardingAttachmentCreate[]> = {
        userId: 999,
        data: undefined as any,
      };

      await expect(service.bulkCreateAttachments(request)).rejects.toThrow(BadRequestException);
      await expect(service.bulkCreateAttachments(request)).rejects.toThrow('BULK_CREATE_ATTACHMENT_DATA_REQUIRED');
      expect(mockOnboardingAttachmentRepository.bulkCreate).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 3. getAttachmentsByOnboardingId
  // ────────────────────────────────────────────────
  describe('getAttachmentsByOnboardingId', () => {
    it('should return all attachments for a given onboardingId', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 100,
      };

      const mockAttachments = [
        mockAttachment,
        { ...mockAttachment, id: 2, documentName: 'certificate.pdf' },
      ];

      mockOnboardingAttachmentRepository.findAll.mockResolvedValue(mockAttachments);

      const result = await service.getAttachmentsByOnboardingId(request);

      expect(result).toEqual(mockAttachments);
      expect(result.length).toBe(2);
      expect(mockOnboardingAttachmentRepository.findAll).toHaveBeenCalledWith({
        where: { onboardingId: 100 },
        order: [['createdAt', 'DESC']],
      });
    });

    it('should return empty array if no attachments found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 999,
      };

      mockOnboardingAttachmentRepository.findAll.mockResolvedValue([]);

      const result = await service.getAttachmentsByOnboardingId(request);

      expect(result).toEqual([]);
      expect(mockOnboardingAttachmentRepository.findAll).toHaveBeenCalledWith({
        where: { onboardingId: 999 },
        order: [['createdAt', 'DESC']],
      });
    });
  });

  // ────────────────────────────────────────────────
  // 4. deleteAttachment
  // ────────────────────────────────────────────────
  describe('deleteAttachment', () => {
    it('should delete attachment and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockOnboardingAttachmentRepository.delete.mockResolvedValue(true);

      const result = await service.deleteAttachment(request);

      expect(result).toBe(true);
      expect(mockOnboardingAttachmentRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return false if attachment not found to delete', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockOnboardingAttachmentRepository.delete.mockResolvedValue(false);

      const result = await service.deleteAttachment(request);

      expect(result).toBe(false);
      expect(mockOnboardingAttachmentRepository.delete).toHaveBeenCalledWith({
        where: { id: 9999 },
      });
    });
  });
});