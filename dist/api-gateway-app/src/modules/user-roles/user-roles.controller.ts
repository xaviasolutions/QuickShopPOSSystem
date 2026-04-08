import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRolesService } from './user-roles.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import { AssignRoleDto, RemoveRoleDto } from '@app/common/dto/user-role.dto';
import type { UserRoleObject } from '@app/common/interfaces/user-role.interface';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post('/v1/assign')
  assignRole(
    @Body() roleData: AssignRoleDto,
  ): Observable<UserRoleObject> {
    return this.userRolesService.assignRole(roleData);
  }

  @Delete('/v1/remove')
  removeRole(
    @Body() roleData: RemoveRoleDto,
  ): Observable<boolean> {
    return this.userRolesService.removeRole(roleData);
  }

  @Get('/v1/company-user/:companyUserId')
  getRolesByCompanyUser(
    @Param('companyUserId') companyUserId: string,
  ): Observable<UserRoleObject[]> {
    return this.userRolesService.getRolesByCompanyUser({ 
      companyUserId: Number(companyUserId) 
    });
  }
}
