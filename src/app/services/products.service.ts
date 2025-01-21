import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ProductCategory } from '../models/product-category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apollo = inject(Apollo)

  SearchProducts(query: string) {
    const QUERY = gql`
      query SearchProducts($query: String!) {
        products(where: {_search: $query}, last: 5){
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
            slug
            name
          }
          categories{
            id,
            name
            slug
          }
          images{
            id
            url
          }
        }
      }
    `;

    return this.apollo.query<{ products: Product[] }>({ query: QUERY, variables: { query } });
  }

  FetchPopularProducts() {

    const QUERY = gql`
      query{
        products(where: { rating_gt: 2 }, last: 4){
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
            slug
            name
          },
          categories{
            id,
            name
            slug
          },
          images{
            id
            url
          }
        }
      }
    `;

    return this.apollo.query<{ products: Product[] }>({
      query: QUERY,
    });
  }

  FindProductsByIds(ids: string[]) {
    const QUERY = gql`
      query FindProductsByIds($ids: [ID!]!){
        products(where: { id_in: $ids }){
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
            slug
            name
          }
          categories{
            id,
            name
            slug
          }
          images{
            id
            url
          }
        }
      } 
    `;

    return this.apollo.query<{ products: Product[] }>({ query: QUERY, variables: { ids } });
  }

  FetchProductCategories() {

    const QUERY = gql`
      query{
        categories(orderBy: name_ASC){
          id,
          name,
          slug,
          image {
            id
            url
          }
          products{
            id
          }
        }
      }
    `;

    return this.apollo.query<{ categories: ProductCategory[] }>({
      query: QUERY,
    });
  }

  FilterPaginateProducts(query: string, categorySlugs: string[], limit: number, offset: number, orderBy: string, excludeIds: string[] = []) {

    const hasCategory = categorySlugs.length > 0

    const QUERY = gql`
      query FilterPaginateProducts($query: String!, $limit: Int!, $offset: Int!, $orderBy: ProductOrderByInput!, ${hasCategory ? '$categorySlugs: [String!]' : ''}) {
        productsConnection(where: { 
          _search: $query,
          ${hasCategory ? 'categories_some: { slug_in: $categorySlugs },' : ''} 
          }, first: $limit, skip: $offset, orderBy: $orderBy){
          aggregate{
            count
          }
          pageInfo{
            hasNextPage
            hasPreviousPage
            pageSize
          }
          edges{
            node{
              id,
              name,
              description,
              price,
              slug,
              rating,
              collection{
                slug
                name
              }
              categories{
                id,
                name
                slug
              }
              images{
                id
                url
              }
            }
          }
        }
      }
    `;

    return this.apollo.query<{
      productsConnection: {
        aggregate: {
          count: number
        },
        pageInfo: {
          hasNextPage: boolean,
          hasPreviousPage: boolean,
          pageSize: number
        },
        edges: { node: Product }[]
      }
    }>({
      query: QUERY,
      variables: { query, categorySlugs, limit, offset, orderBy, excludeIds },
    });
  }
}
