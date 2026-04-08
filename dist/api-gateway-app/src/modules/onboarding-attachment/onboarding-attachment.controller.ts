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
import { OnboardingAttachmentService } from './onboarding-attachment.service';
import { GatewayAuthGuard } from '../auth/guards/jwt-auth.guards';
import type { ApiRequest } from '@app/common/interfaces/request.interface';
import type {
  OnboardingAttachmentCreate,
  OnboardingAttachmentObject,
} from '@app/common/interfaces/onboarding.interface';

@Controller('onboarding-attachment')
export class OnboardingAttachmentController {
  constructor(private readonly onboardingAttachmentService: OnboardingAttachmentService) {}

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/create')
  createAttachment(
    @Body() attachmentData: OnboardingAttachmentCreate,
    @Req() req: Request,
  ): Observable<OnboardingAttachmentObject> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<OnboardingAttachmentCreate> = {
      userId: userId,
      data: attachmentData,
    };
    return this.onboardingAttachmentService.createAttachment(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Post('/v1/bulk-create')
  bulkCreateAttachments(
    @Body() attachmentsData: OnboardingAttachmentCreate[],
    @Req() req: Request,
  ): Observable<OnboardingAttachmentObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<OnboardingAttachmentCreate[]> = {
      userId: userId,
      data: attachmentsData,
    };
    return this.onboardingAttachmentService.bulkCreateAttachments(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Get('/v1/onboarding/:onboardingId')
  getAttachmentsByOnboarding(
    @Param('onboardingId') onboardingId: string,
    @Req() req: Request,
  ): Observable<OnboardingAttachmentObject[]> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(onboardingId),
    };
    return this.onboardingAttachmentService.getAttachmentsByOnboarding(data);
  }

  @UseGuards(GatewayAuthGuard)
  @Delete('/v1/:id')
  deleteAttachment(
    @Param('id') id: string,
    @Req() req: Request,
  ): Observable<boolean> {
    const userId: number = Number(req['user'].sub.toString());
    const data: ApiRequest<number> = {
      userId: userId,
      data: Number(id),
    };
    return this.onboardingAttachmentService.deleteAttachment(data);
  }
}
