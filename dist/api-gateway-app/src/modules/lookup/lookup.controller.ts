import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { Observable } from 'rxjs';
import type { LookUpCategories, LookupObject } from '@app/common/interfaces/lookup.interface';
import { CreateLookupDto } from '@app/common/dto/lookup.dto';

@Controller('/lookup')
export class LookupController {
    constructor(private readonly service: LookupService) { }

    @Post('/v1/create')
    create(@Body() data: CreateLookupDto): Observable<LookupObject> {
        return this.service.create(data)
    }

    @Get('/v1/get-parents')
    getParents(): Observable<LookupObject[]> {
        return this.service.getAllParents()
    }

    @Get('/v1/get-parent-child/:id')
    getParentChildren(@Param('id') parentId: string): Observable<LookUpCategories> {
        return this.service.getParentChild(parentId)
    }

    @Delete('/v1/delete/:id')
    deleteRow(@Param('id') id: string): Observable<number[]> {
        return this.service.deleteRow(id)
    }


}
