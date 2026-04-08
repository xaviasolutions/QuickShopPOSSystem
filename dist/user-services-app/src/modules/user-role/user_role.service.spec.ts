import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user_role.service';
import { BadRequestException } from '@nestjs/common';
import { UserRoleRepository } from '@app/repositories/user-role.repository';
import { UserRole } from '@app/models/user_role.model';
import type {
  AssignRole,
  RemoveRole,
  GetRolesByCompanyUser,
} from '@app/common/interfaces/user-role.interface';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let userRoleRepository: UserRoleRepository;

  // ایک dummy user-role آبجیکٹ (mock response کے لیے)
  const mockUserRole: UserRole = {
    id: 1,
    companyUserId: 100,
    roleId: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as UserRole;

  // repository کے methods کو mock کر رہے ہیں
  const mockUserRoleRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleService,
        {
          provide: UserRoleRepository,
          useValue: mockUserRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
    userRoleRepository = module.get<UserRoleRepository>(UserRoleRepository);

    jest.clearAllMocks();
  });

  // ────────────────────────────────────────────────
  // 1. assignRoleToCompanyUser
  // ────────────────────────────────────────────────
  describe('assignRoleToCompanyUser', () => {
    it('should assign role to company user successfully when companyUserId & roleId provided', async () => {
      const inputData: Partial<AssignRole> = {
        companyUserId: 100,
        roleId: 10,
      };

      mockUserRoleRepository.create.mockResolvedValue(mockUserRole);

      const result = await service.assignRoleToCompanyUser(inputData);

      expect(result).toEqual(mockUserRole);
      expect(mockUserRoleRepository.create).toHaveBeenCalledWith(inputData);
    });

    it('should throw BadRequestException when companyUserId is missing', async () => {
      const inputData: Partial<AssignRole> = {
        roleId: 10,
      };

      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(
        'ASSIGN_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED',
      );
      expect(mockUserRoleRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when roleId is missing', async () => {
      const inputData: Partial<AssignRole> = {
        companyUserId: 100,
      };

      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(
        'ASSIGN_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED',
      );
      expect(mockUserRoleRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when both companyUserId & roleId are missing', async () => {
      const inputData: Partial<AssignRole> = {};

      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(BadRequestException);
      await expect(service.assignRoleToCompanyUser(inputData)).rejects.toThrow(
        'ASSIGN_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED',
      );
      expect(mockUserRoleRepository.create).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────────
  // 2. removeRoleFromCompanyUser
  // ────────────────────────────────────────────────
  describe('removeRoleFromCompanyUser', () => {
    it('should remove role from company user and return true', async () => {
      const inputData: Partial<RemoveRole> = {
        companyUserId: 100,
        roleId: 10,
      };

      mockUserRoleRepository.delete.mockResolvedValue(true);

      const result = await service.removeRoleFromCompanyUser(inputData);

      expect(result).toBe(true);
      expect(mockUserRoleRepository.delete).toHaveBeenCalledWith({
        where: {
          companyUserId: 100,
          roleId: 10,
        },
      });
    });

    it('should return false if no matching record was deleted', async () => {
      const inputData: Partial<RemoveRole> = {
        companyUserId: 999,
        roleId: 888,
      };

      mockUserRoleRepository.delete.mockResolvedValue(false);

      const result = await service.removeRoleFromCompanyUser(inputData);

      expect(result).toBe(false);
      expect(mockUserRoleRepository.delete).toHaveBeenCalledWith({
        where: {
          companyUserId: 999,
          roleId: 888,
        },
      });
    });

   it('should throw BadRequestException if companyUserId or roleId missing', async () => {
  const inputData: Partial<RemoveRole> = {
    roleId: 10,  // companyUserId missing
  };

  await expect(service.removeRoleFromCompanyUser(inputData)).rejects.toThrow(BadRequestException);
  await expect(service.removeRoleFromCompanyUser(inputData)).rejects.toThrow(
    'REMOVE_ROLE_COMPANY_USER_ID_AND_ROLE_ID_REQUIRED',
  );
  
  expect(mockUserRoleRepository.delete).not.toHaveBeenCalled();
  });
  });

  // ────────────────────────────────────────────────
  // 3. listRolesForCompanyUser
  // ────────────────────────────────────────────────
  describe('listRolesForCompanyUser', () => {
    it('should return all roles assigned to a company user', async () => {
      const inputData: Partial<GetRolesByCompanyUser> = {
        companyUserId: 100,
      };

      const mockRoles = [
        mockUserRole,
        { ...mockUserRole, id: 2, roleId: 11 },
      ];

      mockUserRoleRepository.findAll.mockResolvedValue(mockRoles);

      const result = await service.listRolesForCompanyUser(inputData);

      expect(result).toEqual(mockRoles);
      expect(result).toHaveLength(2);
      expect(mockUserRoleRepository.findAll).toHaveBeenCalledWith({
        where: { companyUserId: 100 },
      });
    });

    it('should return empty array if no roles assigned to the company user', async () => {
      const inputData: Partial<GetRolesByCompanyUser> = {
        companyUserId: 999,
      };

      mockUserRoleRepository.findAll.mockResolvedValue([]);

      const result = await service.listRolesForCompanyUser(inputData);

      expect(result).toEqual([]);
      expect(mockUserRoleRepository.findAll).toHaveBeenCalledWith({
        where: { companyUserId: 999 },
      });
    });
  });
});