import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Crp = {
  __typename?: 'Crp';
  creator: User;
  id: Scalars['ID'];
};

export type Crp_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Crp_OrderBy {
  Creator = 'creator',
  Id = 'id'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  crp?: Maybe<Crp>;
  crps: Array<Crp>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryCrpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCrpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Crp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Crp_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  crp?: Maybe<Crp>;
  crps: Array<Crp>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionCrpArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCrpsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Crp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Crp_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  crps?: Maybe<Array<Crp>>;
  id: Scalars['ID'];
};


export type UserCrpsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Crp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Crp_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  Crps = 'crps',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetAllPoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPoolsQuery = { __typename?: 'Query', crps: Array<{ __typename?: 'Crp', id: string, creator: { __typename?: 'User', id: string } }> };


export const GetAllPoolsDocument = gql`
    query getAllPools {
  crps {
    id
    creator {
      id
    }
  }
}
    `;

/**
 * __useGetAllPoolsQuery__
 *
 * To run a query within a React component, call `useGetAllPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPoolsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPoolsQuery, GetAllPoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPoolsQuery, GetAllPoolsQueryVariables>(GetAllPoolsDocument, options);
      }
export function useGetAllPoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPoolsQuery, GetAllPoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPoolsQuery, GetAllPoolsQueryVariables>(GetAllPoolsDocument, options);
        }
export type GetAllPoolsQueryHookResult = ReturnType<typeof useGetAllPoolsQuery>;
export type GetAllPoolsLazyQueryHookResult = ReturnType<typeof useGetAllPoolsLazyQuery>;
export type GetAllPoolsQueryResult = Apollo.QueryResult<GetAllPoolsQuery, GetAllPoolsQueryVariables>;