export interface responseTouristType {
    data: dataTourist[];
    total_pages: number;
    totalrecord: number;
}

export interface dataTourist {
    id: string;
    tourist_email: string;
    tourist_location: string;
    tourist_name: string;
    tourist_profilepicture: string;
}

export interface pageInfo {
    total_pages: number;
    totalrecord: number;
}

export interface responseType {
    error: string;
    message: string[] | string;
    statusCode: number;
}

export interface payloadPostTourist {
    tourist_email: string;
    tourist_location: string;
    tourist_name: string;
}