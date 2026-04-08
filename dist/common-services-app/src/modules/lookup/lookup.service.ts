import { LookUpCategories, LookupCreate, LookupObject } from "@app/common/interfaces/lookup.interface";
import { ApiRequest } from "@app/common/interfaces/request.interface";
import { Lookup } from "@app/database/models/lookup.model";
import { LookupRepository } from "@app/database/repositories/lookup.repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { FindOptions, Op, UpdateOptions } from "sequelize";

@Injectable()
export class LookupService {
    constructor(private readonly lookupRepository: LookupRepository) { }

    async create(body: LookupCreate): Promise<LookupObject> {
        try {
            const data: LookupObject = await this.lookupRepository.create(body as Lookup);
            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }

    }

    async getAllParents(): Promise<LookupObject[]> {
        try {
            const options: FindOptions = {
                where: {
                    parent: null
                },
                raw: true,
                attributes: ['id', 'name']
            }
            const data: LookupObject[] = await this.lookupRepository.findAll(options);
            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async getAllParentChild(parentId: string): Promise<LookUpCategories> {
        try {
            const options: FindOptions = {
                where: {
                    id: Number(parentId)
                },
                raw: true,
                attributes: ['id', 'name']
            }
            const parentData: LookupObject | null = await this.lookupRepository.findOne(options);
            if (!parentData) {
                throw new BadRequestException('LOOKUP_PARENT_ID_NOT_FOUND')
            }
            const data: LookUpCategories = {
                category: parentData.name || "",
                subCategories: []
            }
            const parentChildOptions = {
                where: {
                    parent: Number(parentId)
                },
                raw: true,
                attributes: ['id', 'name']
            }
            const subCategoryData: LookupObject[] = await this.lookupRepository.findAll(parentChildOptions);
            data.subCategories = subCategoryData;
            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async deleteRow(id: string): Promise<number[]> {
        try {
            const options: UpdateOptions<Lookup> = {
                where: {
                    id: Number(id)
                },
            }
            const data = await this.lookupRepository.update(options, { isDeleted: true });
            return data;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}