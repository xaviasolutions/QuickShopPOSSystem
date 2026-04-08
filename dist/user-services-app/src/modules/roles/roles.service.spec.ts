import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@app/repositories/role.repository';
import { Role } from '@app/models/role.model';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type { CreateRole, UpdateRole, RoleObject } from '@app/common/interfaces/role.interface';

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: RoleRepository;

  // ایک dummy role آبجیکٹ (mock response کے لیے)
  const mockRole: RoleObject = {
    id: 1,
    name: 'Admin',
    companyId: 100,
    description: 'Full access role',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // repository کے methods کو mock کر رہے ہیں
  const mockRoleRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<RoleRepository>(RoleRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. createRole
  // ────────────────────────────────────────────────
  describe('createRole', () => {
    it('should create role successfully when name and companyId provided', async () => {
      const request: ApiRequest<CreateRole> = {
        userId: 999,
        data: {
          name: 'Manager',
          companyId: 100,
          description: 'Manager role',
        },
      };

      mockRoleRepository.create.mockResolvedValue(mockRole);

      const result = await service.createRole(request);

      expect(result).toEqual(mockRole);
      expect(mockRoleRepository.create).toHaveBeenCalledWith(request.data);
    });

    it('should throw BadRequestException when name is missing', async () => {
      const request: ApiRequest<CreateRole> = {
        userId: 999,
        data: {
          companyId: 100,
        } as CreateRole,
      };

      await expect(service.createRole(request)).rejects.toThrow(BadRequestException);
      await expect(service.createRole(request)).rejects.toThrow('CREATE_ROLE_NAME_AND_COMPANY_ID_REQUIRED');
      expect(mockRoleRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when companyId is missing', async () => {
      const request: ApiRequest<CreateRole> = {
        userId: 999,
        data: {
          name: 'Manager',
        } as CreateRole,
      };

      await expect(service.createRole(request)).rejects.toThrow(BadRequestException);
      await expect(service.createRole(request)).rejects.toThrow('CREATE_ROLE_NAME_AND_COMPANY_ID_REQUIRED');
      expect(mockRoleRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. getRoleById
  // ────────────────────────────────────────────────
  describe('getRoleById', () => {
    it('should return role when found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockRoleRepository.findOne.mockResolvedValue(mockRole);

      const result = await service.getRoleById(request);

      expect(result).toEqual(mockRole);
      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when role not found', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockRoleRepository.findOne.mockResolvedValue(null);

      await expect(service.getRoleById(request)).rejects.toThrow(NotFoundException);
      await expect(service.getRoleById(request)).rejects.toThrow('GET_ROLE_NOT_FOUND');
    });
  });

  // ────────────────────────────────────────────────
  // 3. listRolesByCompany
  // ────────────────────────────────────────────────
  describe('listRolesByCompany', () => {
    it('should return all roles for a given companyId', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 100,
      };

      const mockRoles = [
        mockRole,
        { ...mockRole, id: 2, name: 'Employee' },
      ];

      mockRoleRepository.findAll.mockResolvedValue(mockRoles);

      const result = await service.listRolesByCompany(request);

      expect(result).toEqual(mockRoles);
      expect(result).toHaveLength(2);
      expect(mockRoleRepository.findAll).toHaveBeenCalledWith({
        where: { companyId: 100 },
      });
    });

    it('should return empty array if no roles found for company', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockRoleRepository.findAll.mockResolvedValue([]);

      const result = await service.listRolesByCompany(request);

      expect(result).toEqual([]);
      expect(mockRoleRepository.findAll).toHaveBeenCalledWith({
        where: { companyId: 9999 },
      });
    });
  });

  // ────────────────────────────────────────────────
  // 4. updateRole
  // ────────────────────────────────────────────────
  describe('updateRole', () => {
    it('should update role successfully', async () => {
      const request: ApiRequest<{ id: number; data: UpdateRole }> = {
        userId: 999,
        data: {
          id: 1,
          data: {
            name: 'Updated Admin',
            description: 'Updated description',
          },
        },
      };

      mockRoleRepository.update.mockResolvedValue(mockRole);

      const result = await service.updateRole(request);

      expect(result).toEqual(mockRole);
      expect(mockRoleRepository.update).toHaveBeenCalledWith(
        { where: { id: 1 } },
        request.data.data,
      );
    });
  });

  // ────────────────────────────────────────────────
  // 5. deleteRole
  // ────────────────────────────────────────────────
  describe('deleteRole', () => {
    it('should delete role and return true', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 1,
      };

      mockRoleRepository.delete.mockResolvedValue(true);

      const result = await service.deleteRole(request);

      expect(result).toBe(true);
      expect(mockRoleRepository.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return false if role not found to delete', async () => {
      const request: ApiRequest<number> = {
        userId: 999,
        data: 9999,
      };

      mockRoleRepository.delete.mockResolvedValue(false);

      const result = await service.deleteRole(request);

      expect(result).toBe(false);
      expect(mockRoleRepository.delete).toHaveBeenCalledWith({
        where: { id: 9999 },
      });
    });
  });
});