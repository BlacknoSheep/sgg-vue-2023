interface User {
  username: string;
  avatar: string;
  identity: string;
  access: string;
  token?: string;
}

interface LoginResponse {
  code: number;
  msg: string;
  data?: {
    user?: User;
  };
}

export type { User, LoginResponse };
