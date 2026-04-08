import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { COMMON_SERVICES_PATTERNS } from '@app/common/constants/patterns';
import { catchError, Observable, throwError } from 'rxjs';
import { PaginatedResponse, Pagination } from '@app/common/interfaces/pagination.interface';
import { CreateLead, LeadFilters, LeadObject, UpdateLead } from '@app/common/interfaces/leads.interface';
import { ApiRequest } from '@app/common/interfaces/request.interface';

@Injectable()
export class LeadsService {
  constructor(@Inject('COMMON_SERVICE') private client: ClientProxy) { }

  createLead(data: Partial<CreateLead>): Observable<LeadObject> {
    return this.client.send(COMMON_SERVICES_PATTERNS.LEADS.CREATE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  getLeadById(id: number): Observable<LeadObject> {
    return this.client.send(COMMON_SERVICES_PATTERNS.LEADS.GET_ONE, id).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  getAllLeads(data: Partial<Pagination<LeadFilters>>): Observable<PaginatedResponse<LeadObject>> {
    return this.client.send(COMMON_SERVICES_PATTERNS.LEADS.GET_ALL, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  updateLead(data: ApiRequest<UpdateLead>): Observable<LeadObject> {
    return this.client.send(COMMON_SERVICES_PATTERNS.LEADS.UPDATE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }

  deleteLead(data: ApiRequest<number>): Observable<{ success: boolean }> {
    return this.client.send(COMMON_SERVICES_PATTERNS.LEADS.DELETE, data).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              error.message || 'INTERNAL_SERVER_ERROR',
              error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}

