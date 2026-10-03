import { Request } from "express";
export type ImageType = {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
};
export type AddressType = {
  address: string;
  city: string;
  state: string;
  country: string;
};
export interface IUserDetail {
  _id: string;
  role: string;
  image?: ImageType;
  address?: AddressType;
  status: string;
  phone: string;
  username: string;
  email: string;
  birthDate: Date;
  gender: string;
  firstName: string;
  lastName: string;
}
export interface IAuthRequest extends Request {
  loggedInUser?: IUserDetail | null;
}