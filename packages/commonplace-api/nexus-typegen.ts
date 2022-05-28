/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  CategoryListRelationFilter: { // input type
    every?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    none?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
    some?: NexusGenInputs['CategoryWhereInput'] | null; // CategoryWhereInput
  }
  CategoryOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  CategoryWhereInput: { // input type
    AND?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    NOT?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    OR?: NexusGenInputs['CategoryWhereInput'][] | null; // [CategoryWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interests?: NexusGenInputs['InterestListRelationFilter'] | null; // InterestListRelationFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  CategoryWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  IntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  InterestListRelationFilter: { // input type
    every?: NexusGenInputs['InterestWhereInput'] | null; // InterestWhereInput
    none?: NexusGenInputs['InterestWhereInput'] | null; // InterestWhereInput
    some?: NexusGenInputs['InterestWhereInput'] | null; // InterestWhereInput
  }
  InterestOrderByWithRelationInput: { // input type
    categories?: NexusGenInputs['CategoryOrderByRelationAggregateInput'] | null; // CategoryOrderByRelationAggregateInput
    contentType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    modifiers?: NexusGenInputs['ModifierOrderByRelationAggregateInput'] | null; // ModifierOrderByRelationAggregateInput
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    posts?: NexusGenInputs['PostOrderByRelationAggregateInput'] | null; // PostOrderByRelationAggregateInput
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  InterestWhereInput: { // input type
    AND?: NexusGenInputs['InterestWhereInput'][] | null; // [InterestWhereInput!]
    NOT?: NexusGenInputs['InterestWhereInput'][] | null; // [InterestWhereInput!]
    OR?: NexusGenInputs['InterestWhereInput'][] | null; // [InterestWhereInput!]
    categories?: NexusGenInputs['CategoryListRelationFilter'] | null; // CategoryListRelationFilter
    contentType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    modifiers?: NexusGenInputs['ModifierListRelationFilter'] | null; // ModifierListRelationFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    posts?: NexusGenInputs['PostListRelationFilter'] | null; // PostListRelationFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  InterestWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  MessageListRelationFilter: { // input type
    every?: NexusGenInputs['MessageWhereInput'] | null; // MessageWhereInput
    none?: NexusGenInputs['MessageWhereInput'] | null; // MessageWhereInput
    some?: NexusGenInputs['MessageWhereInput'] | null; // MessageWhereInput
  }
  MessageOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  MessageOrderByWithRelationInput: { // input type
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    post?: NexusGenInputs['PostOrderByWithRelationInput'] | null; // PostOrderByWithRelationInput
    postId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    readBy?: NexusGenInputs['UserOrderByRelationAggregateInput'] | null; // UserOrderByRelationAggregateInput
    thread?: NexusGenInputs['ThreadOrderByWithRelationInput'] | null; // ThreadOrderByWithRelationInput
    threadId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    type?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    user?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    userId?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  MessageWhereInput: { // input type
    AND?: NexusGenInputs['MessageWhereInput'][] | null; // [MessageWhereInput!]
    NOT?: NexusGenInputs['MessageWhereInput'][] | null; // [MessageWhereInput!]
    OR?: NexusGenInputs['MessageWhereInput'][] | null; // [MessageWhereInput!]
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    post?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    postId?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    readBy?: NexusGenInputs['UserListRelationFilter'] | null; // UserListRelationFilter
    thread?: NexusGenInputs['ThreadWhereInput'] | null; // ThreadWhereInput
    threadId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    type?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  MessageWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  ModifierListRelationFilter: { // input type
    every?: NexusGenInputs['ModifierWhereInput'] | null; // ModifierWhereInput
    none?: NexusGenInputs['ModifierWhereInput'] | null; // ModifierWhereInput
    some?: NexusGenInputs['ModifierWhereInput'] | null; // ModifierWhereInput
  }
  ModifierOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ModifierWhereInput: { // input type
    AND?: NexusGenInputs['ModifierWhereInput'][] | null; // [ModifierWhereInput!]
    NOT?: NexusGenInputs['ModifierWhereInput'][] | null; // [ModifierWhereInput!]
    OR?: NexusGenInputs['ModifierWhereInput'][] | null; // [ModifierWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interests?: NexusGenInputs['InterestListRelationFilter'] | null; // InterestListRelationFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    posts?: NexusGenInputs['PostListRelationFilter'] | null; // PostListRelationFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  NestedBoolFilter: { // input type
    equals?: boolean | null; // Boolean
    not?: NexusGenInputs['NestedBoolFilter'] | null; // NestedBoolFilter
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedIntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NestedStringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  PostListRelationFilter: { // input type
    every?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    none?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    some?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
  }
  PostOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PostOrderByWithRelationInput: { // input type
    content?: NexusGenEnums['SortOrder'] | null; // SortOrder
    contentPreview?: NexusGenEnums['SortOrder'] | null; // SortOrder
    contentType?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    creator?: NexusGenInputs['UserOrderByWithRelationInput'] | null; // UserOrderByWithRelationInput
    creatorId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    description?: NexusGenEnums['SortOrder'] | null; // SortOrder
    generatedTitleSlug?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    interest?: NexusGenInputs['InterestOrderByWithRelationInput'] | null; // InterestOrderByWithRelationInput
    interestId?: NexusGenEnums['SortOrder'] | null; // SortOrder
    messages?: NexusGenInputs['MessageOrderByRelationAggregateInput'] | null; // MessageOrderByRelationAggregateInput
    modifiers?: NexusGenInputs['ModifierOrderByRelationAggregateInput'] | null; // ModifierOrderByRelationAggregateInput
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  PostWhereInput: { // input type
    AND?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    NOT?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    OR?: NexusGenInputs['PostWhereInput'][] | null; // [PostWhereInput!]
    content?: NexusGenInputs['StringFilter'] | null; // StringFilter
    contentPreview?: NexusGenInputs['StringFilter'] | null; // StringFilter
    contentType?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    creator?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    creatorId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    description?: NexusGenInputs['StringFilter'] | null; // StringFilter
    generatedTitleSlug?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    interest?: NexusGenInputs['InterestWhereInput'] | null; // InterestWhereInput
    interestId?: NexusGenInputs['StringFilter'] | null; // StringFilter
    messages?: NexusGenInputs['MessageListRelationFilter'] | null; // MessageListRelationFilter
    modifiers?: NexusGenInputs['ModifierListRelationFilter'] | null; // ModifierListRelationFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  PostWhereUniqueInput: { // input type
    generatedTitleSlug?: string | null; // String
    id?: string | null; // String
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  StringNullableFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringNullableFilter'] | null; // NestedStringNullableFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  ThreadListRelationFilter: { // input type
    every?: NexusGenInputs['ThreadWhereInput'] | null; // ThreadWhereInput
    none?: NexusGenInputs['ThreadWhereInput'] | null; // ThreadWhereInput
    some?: NexusGenInputs['ThreadWhereInput'] | null; // ThreadWhereInput
  }
  ThreadOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  ThreadOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    messages?: NexusGenInputs['MessageOrderByRelationAggregateInput'] | null; // MessageOrderByRelationAggregateInput
    repliesAllowed?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    users?: NexusGenInputs['UserOrderByRelationAggregateInput'] | null; // UserOrderByRelationAggregateInput
  }
  ThreadWhereInput: { // input type
    AND?: NexusGenInputs['ThreadWhereInput'][] | null; // [ThreadWhereInput!]
    NOT?: NexusGenInputs['ThreadWhereInput'][] | null; // [ThreadWhereInput!]
    OR?: NexusGenInputs['ThreadWhereInput'][] | null; // [ThreadWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    messages?: NexusGenInputs['MessageListRelationFilter'] | null; // MessageListRelationFilter
    repliesAllowed?: NexusGenInputs['BoolFilter'] | null; // BoolFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    users?: NexusGenInputs['UserListRelationFilter'] | null; // UserListRelationFilter
  }
  ThreadWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  UserListRelationFilter: { // input type
    every?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    none?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    some?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
  }
  UserOrderByRelationAggregateInput: { // input type
    _count?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserOrderByWithRelationInput: { // input type
    chosenUsername?: NexusGenEnums['SortOrder'] | null; // SortOrder
    coverImage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    credit?: NexusGenEnums['SortOrder'] | null; // SortOrder
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    generatedUsername?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    messages?: NexusGenInputs['MessageOrderByRelationAggregateInput'] | null; // MessageOrderByRelationAggregateInput
    name?: NexusGenEnums['SortOrder'] | null; // SortOrder
    password?: NexusGenEnums['SortOrder'] | null; // SortOrder
    posts?: NexusGenInputs['PostOrderByRelationAggregateInput'] | null; // PostOrderByRelationAggregateInput
    profileImage?: NexusGenEnums['SortOrder'] | null; // SortOrder
    readMessages?: NexusGenInputs['MessageOrderByRelationAggregateInput'] | null; // MessageOrderByRelationAggregateInput
    threads?: NexusGenInputs['ThreadOrderByRelationAggregateInput'] | null; // ThreadOrderByRelationAggregateInput
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserWhereInput: { // input type
    AND?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    NOT?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    OR?: NexusGenInputs['UserWhereInput'][] | null; // [UserWhereInput!]
    chosenUsername?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    coverImage?: NexusGenInputs['StringFilter'] | null; // StringFilter
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    credit?: NexusGenInputs['IntFilter'] | null; // IntFilter
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    generatedUsername?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    messages?: NexusGenInputs['MessageListRelationFilter'] | null; // MessageListRelationFilter
    name?: NexusGenInputs['StringNullableFilter'] | null; // StringNullableFilter
    password?: NexusGenInputs['StringFilter'] | null; // StringFilter
    posts?: NexusGenInputs['PostListRelationFilter'] | null; // PostListRelationFilter
    profileImage?: NexusGenInputs['StringFilter'] | null; // StringFilter
    readMessages?: NexusGenInputs['MessageListRelationFilter'] | null; // MessageListRelationFilter
    threads?: NexusGenInputs['ThreadListRelationFilter'] | null; // ThreadListRelationFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  UserWhereUniqueInput: { // input type
    chosenUsername?: string | null; // String
    email?: string | null; // String
    generatedUsername?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
  QueryMode: "default" | "insensitive"
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONObject: any
}

export interface NexusGenObjects {
  Category: { // root type
    name: string; // String!
  }
  Interest: { // root type
    name: string; // String!
  }
  Message: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Post: { // root type
    content: string; // String!
    contentPreview: string; // String!
    contentType: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  Thread: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    repliesAllowed: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  User: { // root type
    chosenUsername?: string | null; // String
    coverImage: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credit: number; // Int!
    email: string; // String!
    generatedUsername: string; // String!
    name?: string | null; // String
    profileImage: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Category: { // field return type
    interests: NexusGenRootTypes['Interest'][]; // [Interest!]!
    name: string; // String!
  }
  Interest: { // field return type
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    name: string; // String!
  }
  Message: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    post: NexusGenRootTypes['Post'] | null; // Post
    readBy: NexusGenRootTypes['User'][]; // [User!]!
    type: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createMessage: NexusGenRootTypes['Message']; // Message!
  }
  Post: { // field return type
    content: string; // String!
    contentPreview: string; // String!
    contentType: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    creator: NexusGenRootTypes['User']; // User!
    description: string; // String!
    id: string; // String!
    interest: NexusGenRootTypes['Interest']; // Interest!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    authenticate: string; // String!
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    getPostByPostTitle: NexusGenRootTypes['Post']; // Post!
    getPostsByUsername: Array<NexusGenRootTypes['Post'] | null>; // [Post]!
    getUserByPostTitle: NexusGenRootTypes['User']; // User!
    getUserByUsername: NexusGenRootTypes['User']; // User!
    interests: NexusGenRootTypes['Interest'][]; // [Interest!]!
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    registerUser: string; // String!
    thread: NexusGenRootTypes['Thread'] | null; // Thread
    user: NexusGenRootTypes['User']; // User!
  }
  Thread: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    repliesAllowed: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    chosenUsername: string | null; // String
    coverImage: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    credit: number; // Int!
    email: string; // String!
    generatedUsername: string; // String!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    profileImage: string; // String!
    threads: NexusGenRootTypes['Thread'][]; // [Thread!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  Category: { // field return type name
    interests: 'Interest'
    name: 'String'
  }
  Interest: { // field return type name
    categories: 'Category'
    name: 'String'
  }
  Message: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    post: 'Post'
    readBy: 'User'
    type: 'String'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Mutation: { // field return type name
    createMessage: 'Message'
  }
  Post: { // field return type name
    content: 'String'
    contentPreview: 'String'
    contentType: 'String'
    createdAt: 'DateTime'
    creator: 'User'
    description: 'String'
    id: 'String'
    interest: 'Interest'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    authenticate: 'String'
    categories: 'Category'
    getPostByPostTitle: 'Post'
    getPostsByUsername: 'Post'
    getUserByPostTitle: 'User'
    getUserByUsername: 'User'
    interests: 'Interest'
    post: 'Post'
    posts: 'Post'
    registerUser: 'String'
    thread: 'Thread'
    user: 'User'
  }
  Thread: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    messages: 'Message'
    repliesAllowed: 'Boolean'
    updatedAt: 'DateTime'
    users: 'User'
  }
  User: { // field return type name
    chosenUsername: 'String'
    coverImage: 'String'
    createdAt: 'DateTime'
    credit: 'Int'
    email: 'String'
    generatedUsername: 'String'
    name: 'String'
    posts: 'Post'
    profileImage: 'String'
    threads: 'Thread'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Category: {
    interests: { // args
      after?: NexusGenInputs['InterestWhereUniqueInput'] | null; // InterestWhereUniqueInput
      before?: NexusGenInputs['InterestWhereUniqueInput'] | null; // InterestWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Interest: {
    categories: { // args
      after?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      before?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Message: {
    readBy: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    createMessage: { // args
      authorEmail: string; // String!
      content: string; // String!
      postCreatorEmail?: string | null; // String
      postId?: string | null; // String
      threadId?: string | null; // String
      type: string; // String!
    }
  }
  Query: {
    authenticate: { // args
      email: string; // String!
      password: string; // String!
    }
    categories: { // args
      after?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      before?: NexusGenInputs['CategoryWhereUniqueInput'] | null; // CategoryWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    getPostByPostTitle: { // args
      postTitle: string; // String!
    }
    getPostsByUsername: { // args
      chosenUsername: string; // String!
    }
    getUserByPostTitle: { // args
      postTitle: string; // String!
    }
    getUserByUsername: { // args
      chosenUsername: string; // String!
    }
    interests: { // args
      after?: NexusGenInputs['InterestWhereUniqueInput'] | null; // InterestWhereUniqueInput
      before?: NexusGenInputs['InterestWhereUniqueInput'] | null; // InterestWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      where?: NexusGenInputs['PostWhereInput'] | null; // PostWhereInput
    }
    registerUser: { // args
      email: string; // String!
      password: string; // String!
    }
    thread: { // args
      where: NexusGenInputs['ThreadWhereUniqueInput']; // ThreadWhereUniqueInput!
    }
    user: { // args
      id: string; // String!
    }
  }
  Thread: {
    messages: { // args
      after?: NexusGenInputs['MessageWhereUniqueInput'] | null; // MessageWhereUniqueInput
      before?: NexusGenInputs['MessageWhereUniqueInput'] | null; // MessageWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['MessageOrderByWithRelationInput'][] | null; // [MessageOrderByWithRelationInput!]
    }
    users: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  User: {
    threads: { // args
      after?: NexusGenInputs['ThreadWhereUniqueInput'] | null; // ThreadWhereUniqueInput
      before?: NexusGenInputs['ThreadWhereUniqueInput'] | null; // ThreadWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['ThreadOrderByWithRelationInput'][] | null; // [ThreadOrderByWithRelationInput!]
      where?: NexusGenInputs['ThreadWhereInput'] | null; // ThreadWhereInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}