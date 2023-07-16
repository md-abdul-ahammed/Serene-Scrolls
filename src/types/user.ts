export interface ILoginBody {
  password: string;
  email: string;
}

export interface IAuth {
  accessToken: string | undefined;
  user:
    | {
        email: string;
        fullName: string;
        id: string;
        _id: string;
      }
    | undefined;
}
