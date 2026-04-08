import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/user.repository'
import { CompanyUserRepository } from '@app/repositories/company-user.repository';
import { CompanyRepository } from '@app/repositories/company.repository';
import { CompanyUser } from '@app/models/company_user.model';
import { Company } from '@app/models/company.model';
import { FindOptions, Op, UpdateOptions } from 'sequelize';
import { User } from '@app/models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AdminLogin, ChangePassword, OnboardUserObject, UserFilters, UserLogin, UserObject } from '@app/common/interfaces/users.interfaces';
import { ApiRequest } from '@app/common/interfaces/request.interface';
import { FindAndCountAllOptions, PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
dotenv.config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV}`) });

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly companyUserRepository: CompanyUserRepository,
        private readonly companyRepository: CompanyRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService, // Inject this
    ) { }

    async createOnboardUser(_data: ApiRequest<OnboardUserObject>): Promise<Partial<User>> {
        try {
            const data = _data.data;
            const defaultPassword = "Abc123@@";
            const options: FindOptions<User> = {
                where: {
                    email: data.email,
                },
            };

            const userExists = await this.usersRepository.findOne(options);
            if (userExists) {
                throw new BadRequestException('CREATE_USER_ALREADY_EXISTS')
            }

            // 3. Encrypt Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(defaultPassword, salt);
            const user: Partial<User> = {
                email: data.email,
                firstName: data.name,
                lastName: data.name,
                password: hashedPassword
            }
            const newUser: User = await this.usersRepository.create(user);
            //send email for onboarding (insert in notification)
            return { id: newUser.id, email: newUser.email };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async createUser(data: Partial<User>): Promise<Partial<User>> {
        try {
            if (!data.email || !data.password) {
                throw new BadRequestException('CREATE_USER_EMAIL_AND_PASSWORD_REQUIRED');
            }

            const options: FindOptions<User> = {
                where: {
                    email: data.email,
                },
            };

            const userExists = await this.usersRepository.findOne(options);
            if (userExists) {
                throw new BadRequestException('CREATE_USER_ALREADY_EXISTS')
            }

            // 3. Encrypt Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            const newUser: User = await this.usersRepository.create({ ...data, password: hashedPassword });

            const payload = { sub: newUser.id, email: newUser.email };

            const accessToken = this.jwtService.sign(payload, {
                expiresIn: '2d', // Short lived
                secret: `${process.env.JWT_ACCESS_SECRET}`,
            });

            const UpdateOptions: UpdateOptions<User> = {
                where: {
                    id: newUser.id,
                },
            };

            await this.usersRepository.update(UpdateOptions, { token: accessToken });

            return { id: newUser.id, email: newUser.email };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async login(data: UserLogin): Promise<UserObject> {
        try {
            if (!data.email || !data.password) {
                throw new BadRequestException('LOGIN_EMAIL_AND_PASSWORD_REQUIRED');
            }

            const options: FindOptions<User> = {
                where: {
                    email: data.email,
                },
                raw: true,
            };

            const userExists = await this.usersRepository.findOne(options);
            if (!userExists) {
                throw new UnauthorizedException('LOGIN_USER_NOT_FOUND')
            }
            const isPasswordMatch = await bcrypt.compare(data.password, userExists.password);
            if (!isPasswordMatch) {
                throw new UnauthorizedException('LOGIN_INVALID_EMAIL_OR_PASSWORD')
            }

            const payload = { sub: userExists.id, email: userExists.email };

            const accessToken = this.jwtService.sign(payload, {
                expiresIn: '2d', // Short lived
                secret: `${process.env.JWT_ACCESS_SECRET}`,
            });

            const UpdateOptions: UpdateOptions<User> = {
                where: {
                    id: userExists.id,
                },
            };

            await this.usersRepository.update(UpdateOptions, { token: accessToken });
            const userObject: UserObject = {
                id: userExists.id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                phNumber: userExists.phNumber,
                token: accessToken,
            };

            const companyUser = await this.companyUserRepository.findOne({
                where: { userId: userExists.id },
                raw: true,
            });

            if (companyUser) {
                const company = await this.companyRepository.findOne({
                    where: { id: companyUser.companyId },
                    raw: true
                });
                if (company) {
                    userObject.company = company;
                }
            }

            return userObject;
        } catch (error) {
            throw error;
        }
    }

    async loginAdmin(data: AdminLogin): Promise<UserObject> {
        try {
            if (!data.email || !data.password) {
                throw new BadRequestException('LOGIN_EMAIL_AND_PASSWORD_REQUIRED');
            }

            const options: FindOptions<User> = {
                where: {
                    email: data.email,
                    userType: "admin"
                },
                raw: true,
            };

            const userExists = await this.usersRepository.findOne(options);
            if (!userExists) {
                throw new UnauthorizedException('LOGIN_USER_NOT_FOUND')
            }
            const isPasswordMatch = await bcrypt.compare(data.password, userExists.password);
            if (!isPasswordMatch) {
                throw new UnauthorizedException('LOGIN_INVALID_EMAIL_OR_PASSWORD')
            }

            const payload = { sub: userExists.id, email: userExists.email };

            const accessToken = this.jwtService.sign(payload, {
                expiresIn: '2d', // Short lived
                secret: `${process.env.JWT_ACCESS_SECRET}`,
            });

            const UpdateOptions: UpdateOptions<User> = {
                where: {
                    id: userExists.id,
                },
            };

            await this.usersRepository.update(UpdateOptions, { token: accessToken });
            const userObject: UserObject = {
                id: userExists.id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                phNumber: userExists.phNumber,
                token: accessToken,
            };

            const companyUser = await this.companyUserRepository.findOne({
                where: { userId: userExists.id },
                raw: true,
            });

            if (companyUser) {
                const company = await this.companyRepository.findOne({
                    where: { id: companyUser.companyId },
                    raw: true
                });
                if (company) {
                    userObject.company = company;
                }
            }

            return userObject;
        } catch (error) {
            throw error;
        }
    }

    async getUserInfo(id: string): Promise<UserObject> {
        try {
            const options: FindOptions<User> = {
                where: {
                    id: id,
                },
                attributes: ['id', 'email', 'firstName', 'lastName', 'phNumber'],
                raw: true,
            };
            const userExists = await this.usersRepository.findOne(options);
            if (!userExists) {
                throw new BadRequestException('GET_USER_NOT_FOUND')
            }

            const userObject: UserObject = {
                id: userExists.id,
                email: userExists.email,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                phNumber: userExists.phNumber,
            };

            const companyUser = await this.companyUserRepository.findOne({
                where: { userId: userExists.id },
                raw: true,
            });

            if (companyUser) {
                const company = await this.companyRepository.findOne({
                    where: { id: companyUser.companyId },
                    raw: true
                });
                if (company) {
                    userObject.company = company;
                }
            }

            return userObject;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async updateuser(data: ApiRequest<UserObject>): Promise<Partial<User>> {
        try {
            const options: UpdateOptions<User> = {
                where: {
                    id: data.userId,
                },
            };
            await this.usersRepository.update(options, data.data as UserObject);
            return { id: data.userId, ...data.data };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async changePassword(data: ApiRequest<ChangePassword>): Promise<Partial<User>> {
        try {
            const findOptions: FindOptions<User> = {
                where: {
                    id: data.userId,
                },
                raw: true,
                attributes: ['password']
            };

            //get Current password hash from db
            const userExists = await this.usersRepository.findOne(findOptions);
            if (!userExists) {
                throw new BadRequestException('CHANGE_PASSWORD_USER_NOT_FOUND')
            }

            //check the current password for match
            const isPasswordMatch = await bcrypt.compare(data.data.currentPassword, userExists.password);
            if (!isPasswordMatch) {
                throw new BadRequestException('CHANGE_PASSWORD_INVALID_CURRENT_PASSWORD')
            }

            //create a new hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.data.newPassword, salt);

            //update the new password
            await this.usersRepository.update(findOptions, { password: hashedPassword });
            return { id: data.userId };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getAllUsers(data: ApiRequest<Pagination<UserFilters>>): Promise<PaginatedResponse<UserObject>> {
        try {
            const userId = data.userId
            const paginated = data.data;
            const filters = data.data.filters;
            const page = Number(paginated.page) || 1;
            const limit = Number(paginated.size) || 10;
            const offset = (page - 1) * limit;
            const options: FindOptions<User> = {
                raw: true,
                attributes: ['id', 'email', 'firstName', 'lastName', 'phNumber'],
                offset: offset,
                limit: limit,
            };

            if (filters) {
                if (filters.search) {
                    options.where = {
                        ...options.where,
                        [Op.or]: [
                            { email: { [Op.like]: `%${filters.search}%` } },
                            { firstName: { [Op.like]: `%${filters.search}%` } },
                            { lastName: { [Op.like]: `%${filters.search}%` } },
                            { phNumber: { [Op.like]: `%${filters.search}%` } },
                        ],
                    };
                }
                if (filters.userType) {
                    if (typeof filters.userType === 'string') {
                        options.where = {
                            ...options.where,
                            userType: filters.userType,
                        };
                    } else {
                        options.where = {
                            ...options.where,
                            userType: {
                                [Op.in]: filters.userType,
                            },
                        };
                    }

                }
            }



            const responseData: FindAndCountAllOptions<UserObject> = await this.usersRepository.findAndCountAll(options);
            return {
                data: responseData.rows,
                page: page,
                totalPages: Math.ceil(responseData.count / limit),
                totalItems: responseData.count,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }


}
