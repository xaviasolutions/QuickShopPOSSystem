import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsService } from './role-permissions.service';
import { BadRequestException } from '@nestjs/common';
import { RolePermissionRepository } from '@app/repositories/role-permission.repository';
import { RolePermission } from '@app/models/role_permission.model';

describe('RolePermissionsService', () => {
  let service: RolePermissionsService;
  let rolePermissionRepository: RolePermissionRepository;

  // ایک dummy role-permission آبجیکٹ (mock response کے لیے)
  const mockRolePermission: RolePermission = {
    id: 1,
    roleId: 10,
    permissionId: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as RolePermission;

  // repository کے methods کو mock کر رہے ہیں
  const mockRolePermissionRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionsService,
        {
          provide: RolePermissionRepository,
          useValue: mockRolePermissionRepository,
        },
      ],
    }).compile();

    service = module.get<RolePermissionsService>(RolePermissionsService);
    rolePermissionRepository = module.get<RolePermissionRepository>(RolePermissionRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. assignPermissionToRole
  // ────────────────────────────────────────────────
  describe('assignPermissionToRole', () => {
    it('should assign permission to role successfully when roleId & permissionId provided', async () => {
      const inputData: Partial<RolePermission> = {
        roleId: 10,
        permissionId: 20,
      };

      mockRolePermissionRepository.create.mockResolvedValue(mockRolePermission);

      const result = await service.assignPermissionToRole(inputData);

      expect(result).toEqual(mockRolePermission);
      expect(mockRolePermissionRepository.create).toHaveBeenCalledWith(inputData);
    });

    it('should throw BadRequestException when roleId is missing', async () => {
      const inputData: Partial<RolePermission> = {
        permissionId: 20,
      };

      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(
        'ASSIGN_PERMISSION_ROLE_ID_AND_PERMISSION_ID_REQUIRED',
      );
      expect(mockRolePermissionRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when permissionId is missing', async () => {
      const inputData: Partial<RolePermission> = {
        roleId: 10,
      };

      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(
        'ASSIGN_PERMISSION_ROLE_ID_AND_PERMISSION_ID_REQUIRED',
      );
      expect(mockRolePermissionRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when both roleId & permissionId are missing', async () => {
      const inputData: Partial<RolePermission> = {};

      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignPermissionToRole(inputData)).rejects.toThrow(
        'ASSIGN_PERMISSION_ROLE_ID_AND_PERMISSION_ID_REQUIRED',
      );
      expect(mockRolePermissionRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. removePermissionFromRole
  // ────────────────────────────────────────────────
  describe('removePermissionFromRole', () => {
    it('should remove permission from role and return true', async () => {
      mockRolePermissionRepository.delete.mockResolvedValue(true);

      const result = await service.removePermissionFromRole(10, 20);

      expect(result).toBe(true);
      expect(mockRolePermissionRepository.delete).toHaveBeenCalledWith({
        where: { roleId: 10, permissionId: 20 },
      });
    });

    it('should return false if no matching record was deleted', async () => {
      mockRolePermissionRepository.delete.mockResolvedValue(false);

      const result = await service.removePermissionFromRole(999, 888);

      expect(result).toBe(false);
      expect(mockRolePermissionRepository.delete).toHaveBeenCalledWith({
        where: { roleId: 999, permissionId: 888 },
      });
    });
  });

  // ────────────────────────────────────────────────
  // 3. listPermissionsForRole
  // ────────────────────────────────────────────────
  describe('listPermissionsForRole', () => {
    it('should return all permissions assigned to a role', async () => {
      const mockPermissions = [
        mockRolePermission,
        { ...mockRolePermission, id: 2, permissionId: 21 },
      ];

      mockRolePermissionRepository.findAll.mockResolvedValue(mockPermissions);

      const result = await service.listPermissionsForRole(10);

      expect(result).toEqual(mockPermissions);
      expect(result).toHaveLength(2);
      expect(mockRolePermissionRepository.findAll).toHaveBeenCalledWith({
        where: { roleId: 10 },
      });
    });

    it('should return empty array if no permissions are assigned to the role', async () => {
      mockRolePermissionRepository.findAll.mockResolvedValue([]);

      const result = await service.listPermissionsForRole(999);

      expect(result).toEqual([]);
      expect(mockRolePermissionRepository.findAll).toHaveBeenCalledWith({
        where: { roleId: 999 },
      });
    });
  });
});