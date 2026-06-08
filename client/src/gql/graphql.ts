/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: unknown; output: unknown; }
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  register: RegisterResponse;
  updateProfile: User;
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationUpdateProfileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  fullname: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type RegisterDto = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};
