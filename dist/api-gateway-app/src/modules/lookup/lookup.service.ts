import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { COMMON_SERVICES_PATTERNS } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { LookUpCategories, LookupCreate, LookupObject } from '@app/common/interfaces/lookup.interface';

@Injectable()
export class LookupService {
    constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) { }

    create(data: LookupCreate): Observable<LookupObject> {
        return this.client.send(COMMON_SERVICES_PATTERNS.LOOKUP.CREATE, data).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getAllParents(): Observable<LookupObject[]> {
        return this.client.send(COMMON_SERVICES_PATTERNS.LOOKUP.GET_ALL_PARENTS, {}).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    getParentChild(parentId: string): Observable<LookUpCategories> {
        return this.client.send(COMMON_SERVICES_PATTERNS.LOOKUP.GET_PARENT, parentId).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }

    deleteRow(parentId: string): Observable<number[]> {
        return this.client.send(COMMON_SERVICES_PATTERNS.LOOKUP.DELETE_ROW, parentId).pipe(
            catchError((error) => {
                return throwError(
                    () => new HttpException(
                        error.message || 'INTERNAL_SERVER_ERROR',
                        error.status || HttpStatus.INTERNAL_SERVER_ERROR
                    )
                );
            }),
        );
    }
}
