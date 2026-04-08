import { Test, TestingModule } from '@nestjs/testing';
import { LookupService } from './lookup.service';
import { LookupRepository } from '@app/database/repositories/lookup.repository';
import { BadRequestException } from '@nestjs/common';

describe('LookupService', () => {
  let service: LookupService;
  let repository: jest.Mocked<LookupRepository>;


  const mockLookup: LookupObject = {
    id: 1,
    name: 'Category A',
    parent: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LookupService,
        {
          provide: LookupRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LookupService>(LookupService);
    repository = module.get(LookupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CREATE
  describe('create', () => {
    it('should create lookup successfully', async () => {
      const body = { name: 'Category' };
      mockRepository.create.mockResolvedValue(body as any);

      const result = await service.create(body as any);

      expect(result).toEqual(body);
      expect(repository.create).toHaveBeenCalledWith(body);
    });

    it('should throw error if create fails', async () => {
      mockRepository.create.mockRejectedValue(new Error('DB Error'));

      await expect(service.create({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ✅ GET ALL PARENTS
  describe('getAllParents', () => {
    it('should return all parent lookups', async () => {
      const data = [{ id: 1, name: 'Parent' }];
      mockRepository.findAll.mockResolvedValue(data as any);

      const result = await service.getAllParents();

      expect(result).toEqual(data);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should throw error on failure', async () => {
      mockRepository.findAll.mockRejectedValue(new Error());

      await expect(service.getAllParents()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ✅ GET PARENT + CHILD
  describe('getAllParentChild', () => {
    it('should return parent with subcategories', async () => {
      const parent = { id: 1, name: 'Parent' };
      const children = [{ id: 2, name: 'Child' }];

      mockRepository.findOne.mockResolvedValue(parent as any);
      mockRepository.findAll.mockResolvedValue(children as any);

      const result = await service.getAllParentChild('1');

      expect(result).toEqual({
        category: 'Parent',
        subCategories: children,
      });
    });

    it('should throw error if parent not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getAllParentChild('1')).rejects.toThrow(
        'LOOKUP_PARENT_ID_NOT_FOUND',
      );
    });

    it('should throw error on failure', async () => {
      mockRepository.findOne.mockRejectedValue(new Error());

      await expect(service.getAllParentChild('1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ✅ DELETE (SOFT DELETE)
  describe('deleteRow', () => {
    it('should soft delete row successfully', async () => {
      const response = [1];
      mockRepository.update.mockResolvedValue(response as any);

      const result = await service.deleteRow('1');

      expect(result).toEqual(response);
      expect(repository.update).toHaveBeenCalled();
    });

    it('should throw error on failure', async () => {
      mockRepository.update.mockRejectedValue(new Error());

      await expect(service.deleteRow('1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});