import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolePermissionsService } from './role-permissions.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { AssignRolePermissionDto, RemoveRolePermissionDto } from '@app/common/dto/role-permission.dto';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  AssignRolePermission,
  RemoveRolePermission,
  RolePermissionObject,
} from '@app/common/interfaces/role-permission.interface';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/assign')
  assignPermission(
    @Body() rolePermissionData: AssignRolePermissionDto,
    @Req() req: Request,
  ): Observable<RolePermissionObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<AssignRolePermission> = {
      userId: userId,
      data: rolePermissionData,
    };
    return this.rolePermissionsService.assignPermission(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/remove')
  removePermission(
    @Body() rolePermissionData: RemoveRolePermissionDto,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<RemoveRolePermission> = {
      userId: userId,
      data: rolePermissionData,
    };
    return this.rolePermissionsService.removePermission(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/role/:roleId')
  getPermissionsByRole(
    @Param('roleId') roleId: string,
    @Req() req: Request,
  ): Observable<RolePermissionObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(roleId),
    };
    return this.rolePermissionsService.getPermissionsByRole(data);
  }
}
