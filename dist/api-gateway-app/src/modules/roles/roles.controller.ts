import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesService } from './roles.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreateRoleDto, UpdateRoleDto } from '@app/common/dto/role.dto';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CreateRole,
  UpdateRole,
  RoleObject,
} from '@app/common/interfaces/role.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createRole(
    @Body() roleData: CreateRoleDto,
    @Req() req: Request,
  ): Observable<RoleObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<CreateRole> = {
      userId: userId,
      data: roleData,
    };
    return this.rolesService.createRole(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/:id')
  getRole(@Param('id') id: string, @Req() req: Request): Observable<RoleObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.rolesService.getRole(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/company/:companyId')
  getRolesByCompany(
    @Param('companyId') companyId: string,
    @Req() req: Request,
  ): Observable<RoleObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(companyId),
    };
    return this.rolesService.getRolesByCompany(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id')
  updateRole(
    @Param('id') id: string,
    @Body() roleData: UpdateRoleDto,
    @Req() req: Request,
  ): Observable<RoleObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; data: UpdateRole }> = {
      userId: userId,
      data: {
        id: Number(id),
        data: roleData,
      },
    };
    return this.rolesService.updateRole(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deleteRole(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.rolesService.deleteRole(data);
  }
}
