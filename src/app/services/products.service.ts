import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsStore } from '../stores/products.store';
import { Observable } from '@apollo/client/utilities';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apollo = inject(Apollo)

  SearchProducts(query: string) {
    const QUERY = gql`
      query SearchProductByName($query: String!) {
        products(where: {_search: $query}, last: 5){
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
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

  FetchProducts() {

    const QUERY = gql`
      query{
        products{
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
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

  FindProducts(query: string) {
    const QUERY = gql`
      query SearchProductByName($query: String!) {
        products(where: {_search: $query}, last: 5){
          id,
          name,
          description,
          price,
          slug,
          rating,
          collection{
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
}
