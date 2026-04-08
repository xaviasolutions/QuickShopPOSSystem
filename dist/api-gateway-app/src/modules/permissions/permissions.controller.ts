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
import { PermissionsService } from './permissions.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CreatePermissionDto, UpdatePermissionDto } from '@app/common/dto/permission.dto';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  CreatePermission,
  UpdatePermission,
  PermissionObject,
} from '@app/common/interfaces/permission.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createPermission(
    @Body() permissionData: CreatePermissionDto,
    @Req() req: Request,
  ): Observable<PermissionObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<CreatePermission> = {
      userId: userId,
      data: permissionData,
    };
    return this.permissionsService.createPermission(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/all')
  getPermissions(@Req() req: Request): Observable<PermissionObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<void> = {
      userId: userId,
      data: undefined,
    };
    return this.permissionsService.getPermissions(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/:id')
  getPermission(@Param('id') id: string, @Req() req: Request): Observable<PermissionObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.permissionsService.getPermission(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id')
  updatePermission(
    @Param('id') id: string,
    @Body() permissionData: UpdatePermissionDto,
    @Req() req: Request,
  ): Observable<PermissionObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; data: UpdatePermission }> = {
      userId: userId,
      data: {
        id: Number(id),
        data: permissionData,
      },
    };
    return this.permissionsService.updatePermission(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deletePermission(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.permissionsService.deletePermission(data);
  }
}
