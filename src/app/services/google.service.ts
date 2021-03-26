import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map, tap} from 'rxjs/operators';
import {IApiResponseBody} from '../models/api-response-body';
import {Observable} from 'rxjs';
import {IServerDropdownOption} from '../models/server-dropdown';


@Injectable({
    providedIn: 'root'
})
export class GoogleService {

    constructor(private api: ApiService) {
    }

    // create(task: Partial<IDivorceLead>) {
    //     return this.api.post({endpoint: `/divorce-lead/new`, body: task, useAuthUrl: true})
    //         .pipe(
    //             map(res => res as IApiResponseBody),
    //             map((res: IApiResponseBody) => {
    //                 res.Data = DivorceLeadService.adapt(res.Data);
    //                 return res;
    //             })
    //         );
    // }

    // getAll(params?: IGridDataFetcherParams) {
    //     return this.api.get({
    //         endpoint: `/leads/divorces`,
    //         params: {
    //             rowCount: params.perPage,
    //             offset: params.offset,
    //             ...(params.qsearch ? {qsearch: params.qsearch} : {}),
    //             ...(params.city && {city: params.city.join(',')}),
    //         },
    //         useAuthUrl: false,
    //     }).pipe(
    //         map(res => res as IApiResponseBody),
    //         /*map((res: IApiResponseBody) => {
    //             res.Data = res.Data && res.Data.map(lead => {
    //                 return DivorceLeadService.adapt(lead);
    //             });
    //             // console.log(res.Data);
    //             return res;
    //         }),*/
    //     );
    // }

    getGeoFilter(DocId) {
        return this.api.get({endpoint: `/googlemap/geofilter/${DocId}`, useAuthUrl: false}).pipe(
            map(res => res as IApiResponseBody),
            map(res => res.Data),
            tap(res => console.log(res))
        );
    }

    updateFilter(DocId: string, formData: any ) {
        return this.api.patch({endpoint: `/googlemap/geofilter/${DocId}`, body: formData, useAuthUrl: false});
    }

    updateGeo(DocId: string, formData: any ) {
        return this.api.patch({endpoint: `/googlemap/geo/${DocId}`, body: formData, useAuthUrl: false});
    }

    // cityOptions(): Observable<IServerDropdownOption[]> {
    //     return this.api.get({endpoint: `/leads/divorce/city`, useAuthUrl: false})
    //         .pipe(
    //             map((res: any) => {
    //                 return res.Data.map(option => {
    //                     return {
    //                         name: `${option.city} ${option.COUNT ? '(' + option.COUNT + ')' : ''}`,
    //                         value: option.city,
    //                         selected: option.selected,
    //                     };
    //                 })
    //             }),
    //         );
    // }
}
