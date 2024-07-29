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

export interface User {
  userId: number;
  nickname: string;
  username: string;
  email: string;
  profileUrl: string;
  provider: string;
  providerId: string;
  refreshToken: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UpdateUserDto {
  nickname?: string;
  email?: string;
  profileUrl?: string;
  refreshToken?: string;
}

export type UpdateResult = object;

export interface Session {
  sessionId: number;
  sessionName: string;
  hostId: number;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
}

export type Promise = object;

export interface UserSession {
  userSessionId: number;
  userId: number;
  sessionId: number;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  session: Promise;
}

export type UserSessionBodyType = object;

export interface File {
  fileId: number;
  ownerId: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CreateSessionDto {
  sessionName: string;
  sessionFileIds: string[];
}

export interface SessionResponseDto {
  sessionId: number;
  sessionName: string;
  hostId: number;
  createdAt: string;
  fileList: string[];
}

export interface UpdateSessionDto {
  sessionName?: string;
  sessionFileIds?: string[];
}

export interface FileUploadResponseDto {
  success: boolean;
  message: string;
}

export interface UpdateFileDto {
  name: string;
}

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
     * @secure
     */
    authControllerTokenRefresh: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/token-refresh`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @request POST:/auth/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UsersControllerGetUserProfile
     * @request GET:/user/profile
     * @secure
     */
    usersControllerGetUserProfile: (params: RequestParams = {}) =>
      this.request<any, User>({
        path: `/user/profile`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerUpdateUserProfile
     * @request PATCH:/user/profile
     * @secure
     */
    usersControllerUpdateUserProfile: (data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<any, UpdateResult>({
        path: `/user/profile`,
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
     * @name UsersControllerDeleteUser
     * @request DELETE:/user
     * @secure
     */
    usersControllerDeleteUser: (params: RequestParams = {}) =>
      this.request<any, User>({
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
     * @request POST:/user/sessions/{sessionId}/join
     * @secure
     */
    usersControllerPostUserSession: (sessionId: number, data: UserSessionBodyType, params: RequestParams = {}) =>
      this.request<any, UserSession>({
        path: `/user/sessions/${sessionId}/join`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerPatchUserSession
     * @request PATCH:/user/sessions/{sessionId}/display-name
     * @secure
     */
    usersControllerPatchUserSession: (sessionId: number, data: UserSessionBodyType, params: RequestParams = {}) =>
      this.request<any, UpdateResult>({
        path: `/user/sessions/${sessionId}/display-name`,
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
     * @name UsersControllerDeleteUserSession
     * @request DELETE:/user/sessions/{sessionId}
     * @secure
     */
    usersControllerDeleteUserSession: (sessionId: number, params: RequestParams = {}) =>
      this.request<any, UserSession>({
        path: `/user/sessions/${sessionId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UsersControllerGetUserFiles
     * @request GET:/user/files
     * @secure
     */
    usersControllerGetUserFiles: (params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/user/files`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  session = {
    /**
     * No description
     *
     * @tags Session
     * @name SessionsControllerCreateSession
     * @request POST:/session
     * @secure
     */
    sessionsControllerCreateSession: (data: CreateSessionDto, params: RequestParams = {}) =>
      this.request<any, SessionResponseDto>({
        path: `/session`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Session
     * @name SessionsControllerGetSessionInfo
     * @request GET:/session/{sessionId}
     * @secure
     */
    sessionsControllerGetSessionInfo: (sessionId: number, params: RequestParams = {}) =>
      this.request<any, SessionResponseDto>({
        path: `/session/${sessionId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Session
     * @name SessionsControllerUpdate
     * @request PATCH:/session/{sessionId}
     * @secure
     */
    sessionsControllerUpdate: (sessionId: number, data: UpdateSessionDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/session/${sessionId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  file = {
    /**
     * No description
     *
     * @tags file
     * @name FilesControllerUploadFile
     * @request POST:/file
     * @secure
     */
    filesControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, FileUploadResponseDto>({
        path: `/file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file
     * @name FilesControllerGetFile
     * @request GET:/file/{fileId}
     * @secure
     */
    filesControllerGetFile: (fileId: number, params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/file/${fileId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file
     * @name FilesControllerUpdateFile
     * @request PATCH:/file/{fileId}
     * @secure
     */
    filesControllerUpdateFile: (fileId: number, data: UpdateFileDto, params: RequestParams = {}) =>
      this.request<any, UpdateResult>({
        path: `/file/${fileId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags file
     * @name FilesControllerRemove
     * @request DELETE:/file/{fileId}
     * @secure
     */
    filesControllerRemove: (fileId: number, params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/file/${fileId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  notes = {
    /**
     * No description
     *
     * @tags Notes
     * @name NotesControllerFindAll
     * @request GET:/notes
     * @secure
     */
    notesControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesControllerFindOne
     * @request GET:/notes/{id}
     * @secure
     */
    notesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesControllerRemove
     * @request DELETE:/notes/{id}
     * @secure
     */
    notesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
