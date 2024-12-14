export interface CreateUserHttpsRequest {
  name: string;
  email: string;
  password: string;
  ip?: string;
}

export interface CreateUserHttpsData {
  message: string;
}

export interface CreateUserHttpsResponse {
  headers: Object;
  data: CreateUserHttpsData;
}
