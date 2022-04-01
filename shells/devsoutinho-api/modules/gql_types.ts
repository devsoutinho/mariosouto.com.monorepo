import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePostInput = {
  date?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  post?: Maybe<Post>;
};

export type CreateProductInput = {
  date?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type CreateSampleTextInput = {
  text: Scalars['String'];
};

export type CreateYouTubeVideoPayload = {
  __typename?: 'CreateYouTubeVideoPayload';
  youtubeVideos?: Maybe<Array<Maybe<YouTubeVideo>>>;
};

export type FieldFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProductLink?: Maybe<CreatePostPayload>;
  createSampleText: Scalars['String'];
  createYouTubeVideo?: Maybe<CreatePostPayload>;
  syncYouTubeVideos?: Maybe<CreateYouTubeVideoPayload>;
};


export type MutationCreateProductLinkArgs = {
  input: CreateProductInput;
};


export type MutationCreateSampleTextArgs = {
  input?: InputMaybe<CreateSampleTextInput>;
};


export type MutationCreateYouTubeVideoArgs = {
  input: CreatePostInput;
};

export type Post = {
  __typename?: 'Post';
  date?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  postType?: Maybe<PostType>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export enum PostType {
  ProductLink = 'PRODUCT_LINK',
  YoutubeVideo = 'YOUTUBE_VIDEO'
}

export type PostsFilters = {
  date?: InputMaybe<FieldFilter>;
  postType?: InputMaybe<FieldFilter>;
};

export type PostsInput = {
  filter?: InputMaybe<PostsFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type QrCode = {
  __typename?: 'QrCode';
  url?: Maybe<Scalars['String']>;
};

export type QrCodeInput = {
  text?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  greet?: Maybe<Scalars['String']>;
  posts: Array<Maybe<Post>>;
  qrCode: QrCode;
};


export type QueryPostsArgs = {
  input?: InputMaybe<PostsInput>;
};


export type QueryQrCodeArgs = {
  input?: InputMaybe<QrCodeInput>;
};

export type YouTubeVideo = {
  __typename?: 'YouTubeVideo';
  date?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type YouTubeVideosFilters = {
  date?: InputMaybe<FieldFilter>;
  postType?: InputMaybe<FieldFilter>;
};

export type YouTubeVideosInput = {
  filter?: InputMaybe<YouTubeVideosFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreatePostInput: CreatePostInput;
  CreatePostPayload: ResolverTypeWrapper<CreatePostPayload>;
  CreateProductInput: CreateProductInput;
  CreateSampleTextInput: CreateSampleTextInput;
  CreateYouTubeVideoPayload: ResolverTypeWrapper<CreateYouTubeVideoPayload>;
  FieldFilter: FieldFilter;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostType: PostType;
  PostsFilters: PostsFilters;
  PostsInput: PostsInput;
  QrCode: ResolverTypeWrapper<QrCode>;
  QrCodeInput: QrCodeInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  YouTubeVideo: ResolverTypeWrapper<YouTubeVideo>;
  YouTubeVideosFilters: YouTubeVideosFilters;
  YouTubeVideosInput: YouTubeVideosInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreatePostInput: CreatePostInput;
  CreatePostPayload: CreatePostPayload;
  CreateProductInput: CreateProductInput;
  CreateSampleTextInput: CreateSampleTextInput;
  CreateYouTubeVideoPayload: CreateYouTubeVideoPayload;
  FieldFilter: FieldFilter;
  Int: Scalars['Int'];
  Mutation: {};
  Post: Post;
  PostsFilters: PostsFilters;
  PostsInput: PostsInput;
  QrCode: QrCode;
  QrCodeInput: QrCodeInput;
  Query: {};
  String: Scalars['String'];
  YouTubeVideo: YouTubeVideo;
  YouTubeVideosFilters: YouTubeVideosFilters;
  YouTubeVideosInput: YouTubeVideosInput;
};

export type CreatePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostPayload'] = ResolversParentTypes['CreatePostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateYouTubeVideoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateYouTubeVideoPayload'] = ResolversParentTypes['CreateYouTubeVideoPayload']> = {
  youtubeVideos?: Resolver<Maybe<Array<Maybe<ResolversTypes['YouTubeVideo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProductLink?: Resolver<Maybe<ResolversTypes['CreatePostPayload']>, ParentType, ContextType, RequireFields<MutationCreateProductLinkArgs, 'input'>>;
  createSampleText?: Resolver<ResolversTypes['String'], ParentType, ContextType, Partial<MutationCreateSampleTextArgs>>;
  createYouTubeVideo?: Resolver<Maybe<ResolversTypes['CreatePostPayload']>, ParentType, ContextType, RequireFields<MutationCreateYouTubeVideoArgs, 'input'>>;
  syncYouTubeVideos?: Resolver<Maybe<ResolversTypes['CreateYouTubeVideoPayload']>, ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  excerpt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postType?: Resolver<Maybe<ResolversTypes['PostType']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QrCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QrCode'] = ResolversParentTypes['QrCode']> = {
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  greet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType, Partial<QueryPostsArgs>>;
  qrCode?: Resolver<ResolversTypes['QrCode'], ParentType, ContextType, Partial<QueryQrCodeArgs>>;
};

export type YouTubeVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['YouTubeVideo'] = ResolversParentTypes['YouTubeVideo']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  excerpt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreatePostPayload?: CreatePostPayloadResolvers<ContextType>;
  CreateYouTubeVideoPayload?: CreateYouTubeVideoPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  QrCode?: QrCodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  YouTubeVideo?: YouTubeVideoResolvers<ContextType>;
};

