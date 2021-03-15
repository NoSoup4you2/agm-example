export interface IApiResponseBody<T = any> {
    Error?: boolean;
    Message?: string;
    RowsAffected?: number;
    Success?: boolean;
    Data?: T;
    RowCount?: number;
}
