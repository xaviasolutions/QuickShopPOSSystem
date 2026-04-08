import { Controller } from "@nestjs/common";
import { LookupService } from "./lookup.service";
import { COMMON_SERVICES_PATTERNS } from "@app/common/constants/patterns";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import type { LookUpCategories, LookupCreate, LookupObject } from "@app/common/interfaces/lookup.interface";

@Controller()
export class LookupController {
    constructor(private readonly service: LookupService) { }

    @MessagePattern(COMMON_SERVICES_PATTERNS.LOOKUP.CREATE)
    async create(@Payload() data: LookupCreate): Promise<LookupObject> {
        try {
            return await this.service.create(data);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_CANNOT_BE_CREATED',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.LOOKUP.GET_ALL_PARENTS)
    async getAllParents(): Promise<LookupObject[]> {
        try {
            return await this.service.getAllParents();
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_CANNOT_BE_CREATED',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.LOOKUP.GET_PARENT)
    async getParentChild(@Payload() parentId: string): Promise<LookUpCategories> {
        try {
            return await this.service.getAllParentChild(parentId);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_PARENT_NOT_FOUND',
                status: error.getStatus() || 400,
            })
        }
    }

    @MessagePattern(COMMON_SERVICES_PATTERNS.LOOKUP.DELETE_ROW)
    async deleteRow(@Payload() id: string): Promise<number[]> {
        try {
            return await this.service.deleteRow(id);
        } catch (error) {
            throw new RpcException({
                message: error.message || 'CONTROLLER_LOOKUP_ROW_CANNOT_BE_DELETED',
                status: error.getStatus() || 400,
            })
        }
    }
}
