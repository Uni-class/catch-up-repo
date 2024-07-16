export interface OAuth2DataType {
    pathname: string;
    query: {
        client_id: string;
        redirect_uri: string;
        scope?: string;
        state?: string;
    }
    display: {
        text: string;
        iconURL: string;
    }
}