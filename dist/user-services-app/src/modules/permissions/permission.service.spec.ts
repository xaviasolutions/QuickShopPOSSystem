import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PermissionRepository } from '@app/repositories/permission.repository';
import { Permission } from '@app/models/permission.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreatePermission, UpdatePermission, PermissionObject } from '@app/common/interfaces/permission.interface';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionRepository: PermissionRepository;

  // ایک dummy permission آبجیکٹ (mock response کے لیے)
  const mockPermission = {
    id: 1,
    name: 'users:read',
    resource: 'users',
    action: 'read',
    description: 'Read user data',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // repository کے تمام methods کو mock کر رہے ہیں
  const mockPermissionRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: PermissionRepository,
          useValue: mockPermissionRepository,
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionRepository = module.get<PermissionRepository>(PermissionRepository);

    jest.clearAllMocks();
  });

  describe('createPermission', () => {
    it('should create permission successfully when name, resource and action provided', async () => {
      const request: ApiRequest<CreatePermission> = {
        userId: 999,
        data: {
          name: 'orders:create',
          resource: 'orders',
          action: 'create',
          description: 'Create new orders',
        },
      };

      mockPermissionRepository.create.mockResolvedValue(mockPermission);

      const result = await service.createPermission(request);

      expect(result).toEqual(mockPermission);
      expect(mockPermissionRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when name is missing', async () => {
      const request: ApiRequest<CreatePermission> = {
        userId: 999,
        data: {
          resource: 'users',
          action: 'update',
        } as CreatePermission,
      };

      await expect(service.createPermission(request)).rejects.toThrow(BadRequestException);
      await expect(service.createPermission(request)).rejects.toThrow('CREATE_PERMISSION_NAME_RESOURCE_AND_ACTION_REQUIRED');
      expect(mockPermissionRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when resource is missing', async () => {
      const request: ApiRequest<CreatePermission> = {
        userId: 999,
        data: {
          name: 'users:delete',
          action: 'delete',
        } as CreatePermission,
      };

      await expect(service.createPermission(request)).rejects.toThrow(BadRequestException);
      await expect(service.createPermission(request)).rejects.toThrow('CREATE_PERMISSION_NAME_RESOURCE_AND_ACTION_REQUIRED');
      expect(mockPermissionRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when action is missing', async () => {
      const request: ApiRequest<CreatePermission> = {
        userId: 999,
        data: {
          name: 'products:view',
          resource: 'products',
        } as CreatePermission,
      };

      await expect(service.createPermission(request)).rejects.toThrow(BadRequestException);
      await expect(service.createPermission(request)).rejects.toThrow('CREATE_PERMISSION_NAME_RESOURCE_AND_ACTION_REQUIRED');
      expect(mockPermissionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('getPermissionById', () => {
    it('should return permission when found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockPermissionRepository.findOne.mockResolvedValue(mockPermission);

      const result = await service.getPermissionById(request);

      expect(result).toEqual(mockPermission);
      expect(mockPermissionRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when permission not found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockPermissionRepository.findOne.mockResolvedValue(null);

      await expect(service.getPermissionById(request)).rejects.toThrow(NotFoundException);
      await expect(service.getPermissionById(request)).rejects.toThrow('GET_PERMISSION_NOT_FOUND');
    });
  });

  describe('listPermissions', () => {
    it('should return all permissions', async () => {
      const request: ApiRequest<void> = {
        userId: 999,
        data: undefined as any,
      };

      mockPermissionRepository.findAll.mockResolvedValue([mockPermission, { ...mockPermission, id: 2 }]);

      const result = await service.listPermissions(request);

      expect(result).toHaveLength(2);
      expect(mockPermissionRepository.findAll).toHaveBeenCalledWith({});
    });

    it('should return empty array if no permissions exist', async () => {
      const request: ApiRequest<void> = {
        userId: 999,
        data: undefined as any,
      };

      mockPermissionRepository.findAll.mockResolvedValue([]);

      const result = await service.listPermissions(request);

      expect(result).toEqual([]);
    });
  });

  describe('updatePermission', () => {
    it('should update permission successfully', async () => {
      const request: ApiRequest<{ id: number; data: UpdatePermission }> = {
        userId: 999,
        data: {
          id: 1,
          data: {
            description: 'Updated description',
            action: 'write',
          },
        },
      };

      mockPermissionRepository.update.mockResolvedValue(mockPermission);

      const result = await service.updatePermission(request);

      expect(result).toEqual(mockPermission);
      expect(mockPermissionRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        request.data.data,
      );
    });
  });

  describe('deletePermission', () => {
    it('should delete permission and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockPermissionRepository.delete.mockResolvedValue(true);

      const result = await service.deletePermission(request);

      expect(result).toBe(true);
      expect(mockPermissionRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});