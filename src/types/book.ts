import { IAuth } from "./user";

export interface BookType {
  title: string;
  author: string;
  genre: string;
  publication: string;
  addedBy: string | IAuth;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
