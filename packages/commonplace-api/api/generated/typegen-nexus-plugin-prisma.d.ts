import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Post: Prisma.Post
  Thread: Prisma.Thread
  Message: Prisma.Message
  Interest: Prisma.Interest
  Category: Prisma.Category
  Modifier: Prisma.Modifier
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
    }
    threads: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'repliesAllowed' | 'users' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'repliesAllowed' | 'users' | 'messages' | 'updatedAt' | 'createdAt'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
    }
    interests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedCategorySlug' | 'interests' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedCategorySlug' | 'interests' | 'updatedAt' | 'createdAt'
    }
    modifiers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
    }
  },
  User: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
    }
    threads: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'repliesAllowed' | 'users' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'repliesAllowed' | 'users' | 'messages' | 'updatedAt' | 'createdAt'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
    }
    readMessages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
    }
  }
  Post: {
    modifiers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
    }
  }
  Thread: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
    }
    messages: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'type' | 'content' | 'user' | 'userId' | 'thread' | 'threadId' | 'post' | 'postId' | 'readBy' | 'updatedAt' | 'createdAt'
    }
  }
  Message: {
    readBy: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'email' | 'name' | 'password' | 'generatedUsername' | 'chosenUsername' | 'credit' | 'profileImage' | 'coverImage' | 'posts' | 'threads' | 'messages' | 'readMessages' | 'updatedAt' | 'createdAt'
    }
  }
  Interest: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
    }
    categories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedCategorySlug' | 'interests' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedCategorySlug' | 'interests' | 'updatedAt' | 'createdAt'
    }
    modifiers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedModifierSlug' | 'posts' | 'interests' | 'updatedAt' | 'createdAt'
    }
  }
  Category: {
    interests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
    }
  }
  Modifier: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'title' | 'description' | 'generatedTitleSlug' | 'contentType' | 'contentPreview' | 'content' | 'interest' | 'interestId' | 'modifiers' | 'creator' | 'creatorId' | 'messages' | 'updatedAt' | 'createdAt'
    }
    interests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
      ordering: 'id' | 'name' | 'generatedInterestSlug' | 'contentType' | 'posts' | 'categories' | 'modifiers' | 'updatedAt' | 'createdAt'
    }
  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    post: 'Post'
    posts: 'Post'
    thread: 'Thread'
    threads: 'Thread'
    message: 'Message'
    messages: 'Message'
    interest: 'Interest'
    interests: 'Interest'
    category: 'Category'
    categories: 'Category'
    modifier: 'Modifier'
    modifiers: 'Modifier'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'AffectedRowsOutput'
    deleteOnePost: 'Post'
    deleteManyPost: 'AffectedRowsOutput'
    upsertOnePost: 'Post'
    createOneThread: 'Thread'
    updateOneThread: 'Thread'
    updateManyThread: 'AffectedRowsOutput'
    deleteOneThread: 'Thread'
    deleteManyThread: 'AffectedRowsOutput'
    upsertOneThread: 'Thread'
    createOneMessage: 'Message'
    updateOneMessage: 'Message'
    updateManyMessage: 'AffectedRowsOutput'
    deleteOneMessage: 'Message'
    deleteManyMessage: 'AffectedRowsOutput'
    upsertOneMessage: 'Message'
    createOneInterest: 'Interest'
    updateOneInterest: 'Interest'
    updateManyInterest: 'AffectedRowsOutput'
    deleteOneInterest: 'Interest'
    deleteManyInterest: 'AffectedRowsOutput'
    upsertOneInterest: 'Interest'
    createOneCategory: 'Category'
    updateOneCategory: 'Category'
    updateManyCategory: 'AffectedRowsOutput'
    deleteOneCategory: 'Category'
    deleteManyCategory: 'AffectedRowsOutput'
    upsertOneCategory: 'Category'
    createOneModifier: 'Modifier'
    updateOneModifier: 'Modifier'
    updateManyModifier: 'AffectedRowsOutput'
    deleteOneModifier: 'Modifier'
    deleteManyModifier: 'AffectedRowsOutput'
    upsertOneModifier: 'Modifier'
  },
  User: {
    id: 'String'
    email: 'String'
    name: 'String'
    password: 'String'
    generatedUsername: 'String'
    chosenUsername: 'String'
    credit: 'Int'
    profileImage: 'String'
    coverImage: 'String'
    posts: 'Post'
    threads: 'Thread'
    messages: 'Message'
    readMessages: 'Message'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Post: {
    id: 'String'
    title: 'String'
    description: 'String'
    generatedTitleSlug: 'String'
    contentType: 'String'
    contentPreview: 'String'
    content: 'String'
    interest: 'Interest'
    interestId: 'String'
    modifiers: 'Modifier'
    creator: 'User'
    creatorId: 'String'
    messages: 'Message'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Thread: {
    id: 'String'
    repliesAllowed: 'Boolean'
    users: 'User'
    messages: 'Message'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Message: {
    id: 'String'
    type: 'String'
    content: 'String'
    user: 'User'
    userId: 'String'
    thread: 'Thread'
    threadId: 'String'
    post: 'Post'
    postId: 'String'
    readBy: 'User'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Interest: {
    id: 'String'
    name: 'String'
    generatedInterestSlug: 'String'
    contentType: 'String'
    posts: 'Post'
    categories: 'Category'
    modifiers: 'Modifier'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Category: {
    id: 'String'
    name: 'String'
    generatedCategorySlug: 'String'
    interests: 'Interest'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
  Modifier: {
    id: 'String'
    name: 'String'
    generatedModifierSlug: 'String'
    posts: 'Post'
    interests: 'Interest'
    updatedAt: 'DateTime'
    createdAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Post: Typegen.NexusPrismaFields<'Post'>
  Thread: Typegen.NexusPrismaFields<'Thread'>
  Message: Typegen.NexusPrismaFields<'Message'>
  Interest: Typegen.NexusPrismaFields<'Interest'>
  Category: Typegen.NexusPrismaFields<'Category'>
  Modifier: Typegen.NexusPrismaFields<'Modifier'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  