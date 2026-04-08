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
import { OnboardingVerificationService } from './onboarding-verification.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  OnboardingVerificationCreate,
  OnboardingVerificationUpdate,
  OnboardingVerificationObject,
} from '@app/common/interfaces/onboarding.interface';

@Controller('onboarding-verification')
export class OnboardingVerificationController {
  constructor(private readonly onboardingVerificationService: OnboardingVerificationService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createVerification(
    @Body() verificationData: OnboardingVerificationCreate,
    @Req() req: Request,
  ): Observable<OnboardingVerificationObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<OnboardingVerificationCreate> = {
      userId: userId,
      data: verificationData,
    };
    return this.onboardingVerificationService.createVerification(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/bulk-create')
  bulkCreateVerifications(
    @Body() verificationsData: OnboardingVerificationCreate[],
    @Req() req: Request,
  ): Observable<OnboardingVerificationObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<OnboardingVerificationCreate[]> = {
      userId: userId,
      data: verificationsData,
    };
    return this.onboardingVerificationService.bulkCreateVerifications(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/onboarding/:onboardingId')
  getVerificationsByOnboarding(
    @Param('onboardingId') onboardingId: string,
    @Req() req: Request,
  ): Observable<OnboardingVerificationObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(onboardingId),
    };
    return this.onboardingVerificationService.getVerificationsByOnboarding(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Patch('/v1/:id')
  updateVerification(
    @Param('id') id: string,
    @Body() verificationData: OnboardingVerificationUpdate,
    @Req() req: Request,
  ): Observable<OnboardingVerificationObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<{ id: number; data: OnboardingVerificationUpdate }> = {
      userId: userId,
      data: {
        id: Number(id),
        data: verificationData,
      },
    };
    return this.onboardingVerificationService.updateVerification(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deleteVerification(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.onboardingVerificationService.deleteVerification(data);
  }
}
