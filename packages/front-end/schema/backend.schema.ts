/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateUserDto {
  nickname?: string;
  email?: string;
  profileUrl?: string;
  refreshToken?: string;
}

export interface Session {
  sessionId: number;
  sessionName: string;
  hostId: number;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
}

export interface UserSession {
  userSessionId: number;
  userId: number;
  sessionId: number;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type UpdateResult = object;

export type CreateSessionDto = object;

export type UpdateSessionDto = object;

export type CreateFileDto = object;

export type UpdateFileDto = object;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: FormData) =>
      (Array.from(input.keys()) || []).reduce((formData, key) => {
        const property = input.get(key);
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Catch-UP API Documentation
 * @version 1.0.0
 * @contact
 *
 * Catch-UP API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description hello 가져오기
   *
   * @name AppControllerGetHello
   * @summary getHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerNaverCallback
     * @request GET:/auth/naver/callback
     */
    authControllerNaverCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/naver/callback`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleCallback
     * @request GET:/auth/google/callback
     */
    authControllerGoogleCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/google/callback`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerKakaoCallback
     * @request GET:/auth/kakao/callback
     */
    authControllerKakaoCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/kakao/callback`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerTokenRefresh
     * @request GET:/auth/token-refresh
     */
    authControllerTokenRefresh: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/token-refresh`,
        method: 'GET',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UsersControllerFindOne
     * @request GET:/user
     * @secure
     */
    usersControllerFindOne: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerUpdate
     * @request PATCH:/user
     * @secure
     */
    usersControllerUpdate: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerRemove
     * @request DELETE:/user
     * @secure
     */
    usersControllerRemove: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerGetSessions
     * @request GET:/user/sessions
     * @secure
     */
    usersControllerGetSessions: (
      query: {
        role: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, Session[]>({
        path: `/user/sessions`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerPostUserSession
     * @request POST:/user/sessions
     * @secure
     */
    usersControllerPostUserSession: (
      query: {
        displayName: string;
        sessionId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, UserSession>({
        path: `/user/sessions`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerPatchUserSession
     * @request PATCH:/user/sessions
     * @secure
     */
    usersControllerPatchUserSession: (
      query: {
        displayName: string;
        sessionId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, UpdateResult>({
        path: `/user/sessions`,
        method: 'PATCH',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerDeleteUserSession
     * @request DELETE:/user/sessions
     * @secure
     */
    usersControllerDeleteUserSession: (params: RequestParams = {}) =>
      this.request<any, UserSession>({
        path: `/user/sessions`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  sessions = {
    /**
     * No description
     *
     * @name SessionsControllerCreate
     * @request POST:/sessions
     */
    sessionsControllerCreate: (data: CreateSessionDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sessions`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name SessionsControllerFindAll
     * @request GET:/sessions
     */
    sessionsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sessions`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name SessionsControllerFindOne
     * @request GET:/sessions/{id}
     */
    sessionsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sessions/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name SessionsControllerUpdate
     * @request PATCH:/sessions/{id}
     */
    sessionsControllerUpdate: (id: string, data: UpdateSessionDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sessions/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name SessionsControllerRemove
     * @request DELETE:/sessions/{id}
     */
    sessionsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sessions/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @name FilesControllerCreate
     * @request POST:/files
     */
    filesControllerCreate: (data: CreateFileDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name FilesControllerFindAll
     * @request GET:/files
     */
    filesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name FilesControllerFindOne
     * @request GET:/files/{id}
     */
    filesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name FilesControllerUpdate
     * @request PATCH:/files/{id}
     */
    filesControllerUpdate: (id: string, data: UpdateFileDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name FilesControllerRemove
     * @request DELETE:/files/{id}
     */
    filesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/files/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  notes = {
    /**
     * No description
     *
     * @name NotesControllerFindAll
     * @request GET:/notes
     */
    notesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name NotesControllerFindOne
     * @request GET:/notes/{id}
     */
    notesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name NotesControllerRemove
     * @request DELETE:/notes/{id}
     */
    notesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
}
