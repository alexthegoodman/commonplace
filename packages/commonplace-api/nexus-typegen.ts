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
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONObject: any
  Upload: any
}

export interface NexusGenObjects {
  Category: { // root type
    name?: string | null; // String
  }
  Dashboard: {};
  DateValuePair: { // root type
    date?: string | null; // String
    value?: string | null; // String
  }
  Interest: { // root type
    generatedInterestSlug?: string | null; // String
    name?: string | null; // String
  }
  LabelValuePair: { // root type
    label?: string | null; // String
    value?: string | null; // String
  }
  Message: { // root type
    content?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    type?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Mutation: {};
  Post: { // root type
    content?: string | null; // String
    contentPreview?: string | null; // String
    contentType?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    generatedTitleSlug?: string | null; // String
    id?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PublicPost: { // root type
    content?: string | null; // String
    contentPreview?: string | null; // String
    contentType?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    generatedTitleSlug?: string | null; // String
    id?: string | null; // String
    interest?: NexusGenRootTypes['Interest'] | null; // Interest
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PublicUser: { // root type
    chosenUsername?: string | null; // String
    coverImage?: string | null; // String
    generatedUsername?: string | null; // String
    name?: string | null; // String
    profileImage?: string | null; // String
  }
  Query: {};
  Record: { // root type
    content?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Thread: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: string | null; // String
    repliesAllowed?: boolean | null; // Boolean
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  User: { // root type
    chosenUsername?: string | null; // String
    coverImage?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    credit?: number | null; // Int
    email?: string | null; // String
    generatedUsername?: string | null; // String
    name?: string | null; // String
    profileImage?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Category: { // field return type
    interests: Array<NexusGenRootTypes['Interest'] | null> | null; // [Interest]
    name: string | null; // String
  }
  Dashboard: { // field return type
    dailyImpressions: number | null; // Int
    dailyImpressionsByInterest: Array<NexusGenRootTypes['LabelValuePair'] | null> | null; // [LabelValuePair]
    dau: number | null; // Int
    dauMonthly: Array<NexusGenRootTypes['DateValuePair'] | null> | null; // [DateValuePair]
    mau: number | null; // Int
    mauYearly: Array<NexusGenRootTypes['DateValuePair'] | null> | null; // [DateValuePair]
    totalPosts: number | null; // Int
    totalPostsByInterest: Array<NexusGenRootTypes['LabelValuePair'] | null> | null; // [LabelValuePair]
    totalUsers: number | null; // Int
  }
  DateValuePair: { // field return type
    date: string | null; // String
    value: string | null; // String
  }
  Interest: { // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    generatedInterestSlug: string | null; // String
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
  }
  LabelValuePair: { // field return type
    label: string | null; // String
    value: string | null; // String
  }
  Message: { // field return type
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    post: NexusGenRootTypes['Post'] | null; // Post
    type: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['PublicUser'] | null; // PublicUser
  }
  Mutation: { // field return type
    createMessage: NexusGenRootTypes['Message']; // Message!
    createPost: NexusGenRootTypes['Post']; // Post!
    createReadRecord: NexusGenRootTypes['Record']; // Record!
    deletePost: string; // String!
    registerUser: string; // String!
    updatePost: NexusGenRootTypes['Post']; // Post!
    updateProfile: string; // String!
  }
  Post: { // field return type
    content: string | null; // String
    contentPreview: string | null; // String
    contentType: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: NexusGenRootTypes['PublicUser'] | null; // PublicUser
    description: string | null; // String
    generatedTitleSlug: string | null; // String
    id: string | null; // String
    interest: NexusGenRootTypes['Interest'] | null; // Interest
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PublicPost: { // field return type
    content: string | null; // String
    contentPreview: string | null; // String
    contentType: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    generatedTitleSlug: string | null; // String
    id: string | null; // String
    interest: NexusGenRootTypes['Interest'] | null; // Interest
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PublicUser: { // field return type
    chosenUsername: string | null; // String
    coverImage: string | null; // String
    generatedUsername: string | null; // String
    name: string | null; // String
    profileImage: string | null; // String
  }
  Query: { // field return type
    authenticate: string | null; // String
    getDashboardData: NexusGenRootTypes['Dashboard'] | null; // Dashboard
    getPostByPostTitle: NexusGenRootTypes['PublicPost'] | null; // PublicPost
    getPostImpressions: Array<NexusGenRootTypes['Message'] | null>; // [Message]!
    getPostURLs: Array<string | null> | null; // [String]
    getPostsByUsername: Array<NexusGenRootTypes['PublicPost'] | null> | null; // [PublicPost]
    getProfileURLs: Array<string | null> | null; // [String]
    getQueuePosts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    getThreadById: NexusGenRootTypes['Thread'] | null; // Thread
    getUser: NexusGenRootTypes['User'] | null; // User
    getUserByPostTitle: NexusGenRootTypes['PublicUser'] | null; // PublicUser
    getUserByUsername: NexusGenRootTypes['PublicUser'] | null; // PublicUser
    getUserThreads: Array<NexusGenRootTypes['Thread'] | null> | null; // [Thread]
  }
  Record: { // field return type
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    name: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Thread: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string | null; // String
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    readHistory: Array<NexusGenRootTypes['Record'] | null> | null; // [Record]
    repliesAllowed: boolean | null; // Boolean
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    users: Array<NexusGenRootTypes['PublicUser'] | null> | null; // [PublicUser]
  }
  User: { // field return type
    chosenUsername: string | null; // String
    coverImage: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    credit: number | null; // Int
    email: string | null; // String
    generatedUsername: string | null; // String
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    profileImage: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenFieldTypeNames {
  Category: { // field return type name
    interests: 'Interest'
    name: 'String'
  }
  Dashboard: { // field return type name
    dailyImpressions: 'Int'
    dailyImpressionsByInterest: 'LabelValuePair'
    dau: 'Int'
    dauMonthly: 'DateValuePair'
    mau: 'Int'
    mauYearly: 'DateValuePair'
    totalPosts: 'Int'
    totalPostsByInterest: 'LabelValuePair'
    totalUsers: 'Int'
  }
  DateValuePair: { // field return type name
    date: 'String'
    value: 'String'
  }
  Interest: { // field return type name
    categories: 'Category'
    generatedInterestSlug: 'String'
    name: 'String'
    posts: 'Post'
  }
  LabelValuePair: { // field return type name
    label: 'String'
    value: 'String'
  }
  Message: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    id: 'String'
    post: 'Post'
    type: 'String'
    updatedAt: 'DateTime'
    user: 'PublicUser'
  }
  Mutation: { // field return type name
    createMessage: 'Message'
    createPost: 'Post'
    createReadRecord: 'Record'
    deletePost: 'String'
    registerUser: 'String'
    updatePost: 'Post'
    updateProfile: 'String'
  }
  Post: { // field return type name
    content: 'String'
    contentPreview: 'String'
    contentType: 'String'
    createdAt: 'DateTime'
    creator: 'PublicUser'
    description: 'String'
    generatedTitleSlug: 'String'
    id: 'String'
    interest: 'Interest'
    title: 'String'
    updatedAt: 'DateTime'
  }
  PublicPost: { // field return type name
    content: 'String'
    contentPreview: 'String'
    contentType: 'String'
    createdAt: 'DateTime'
    description: 'String'
    generatedTitleSlug: 'String'
    id: 'String'
    interest: 'Interest'
    title: 'String'
    updatedAt: 'DateTime'
  }
  PublicUser: { // field return type name
    chosenUsername: 'String'
    coverImage: 'String'
    generatedUsername: 'String'
    name: 'String'
    profileImage: 'String'
  }
  Query: { // field return type name
    authenticate: 'String'
    getDashboardData: 'Dashboard'
    getPostByPostTitle: 'PublicPost'
    getPostImpressions: 'Message'
    getPostURLs: 'String'
    getPostsByUsername: 'PublicPost'
    getProfileURLs: 'String'
    getQueuePosts: 'Post'
    getThreadById: 'Thread'
    getUser: 'User'
    getUserByPostTitle: 'PublicUser'
    getUserByUsername: 'PublicUser'
    getUserThreads: 'Thread'
  }
  Record: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    name: 'String'
    updatedAt: 'DateTime'
  }
  Thread: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    messages: 'Message'
    readHistory: 'Record'
    repliesAllowed: 'Boolean'
    updatedAt: 'DateTime'
    users: 'PublicUser'
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
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createMessage: { // args
      authorUsername: string; // String!
      content: string; // String!
      postCreatorUsername?: string | null; // String
      postId?: string | null; // String
      threadId?: string | null; // String
      type: string; // String!
    }
    createPost: { // args
      contentType: string; // String!
      description: string; // String!
      file1Data?: string | null; // String
      file1Name?: string | null; // String
      file1Size?: number | null; // Int
      file1Type?: string | null; // String
      file2Data?: string | null; // String
      file2Name?: string | null; // String
      file2Size?: number | null; // Int
      file2Type?: string | null; // String
      interestId: string; // String!
      text?: string | null; // String
      title: string; // String!
    }
    createReadRecord: { // args
      threadId: string; // String!
      username: string; // String!
    }
    deletePost: { // args
      creatorId: string; // String!
      postTitleSlug: string; // String!
    }
    updatePost: { // args
      creatorId: string; // String!
      description: string; // String!
      postTitleSlug: string; // String!
      title: string; // String!
    }
    updateProfile: { // args
      coverImageData?: string | null; // String
      coverImageName?: string | null; // String
      coverImageSize?: number | null; // Int
      coverImageType?: string | null; // String
      profileImageData?: string | null; // String
      profileImageName?: string | null; // String
      profileImageSize?: number | null; // Int
      profileImageType?: string | null; // String
      userId: string; // String!
      username: string; // String!
    }
  }
  Query: {
    getPostByPostTitle: { // args
      postTitle: string; // String!
    }
    getPostImpressions: { // args
      postTitle: string; // String!
    }
    getPostsByUsername: { // args
      chosenUsername: string; // String!
    }
    getQueuePosts: { // args
      interestId?: string | null; // String
    }
    getThreadById: { // args
      threadId: string; // String!
    }
    getUserByPostTitle: { // args
      postTitle: string; // String!
    }
    getUserByUsername: { // args
      chosenUsername: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

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