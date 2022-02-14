// import { gql } from '@apollo/client'
import gql from 'graphql-tag'

export const READ_QUERY = gql`  
  query Todo {
    todos {
        data {
            id
            attributes {
                name
                done
            }
        },
        meta {
            pagination {
                page
                pageSize
            }
        }
    }
    
  }
`

export const ADD_ACTIONS = gql`
    mutation CreateTodo($name: String, $done: Boolean, $publishedAt: DateTime) {
        createTodo(data: {name: $name, done: $done, publishedAt: $publishedAt}) {
            data {
                id
                attributes {
                    name
                    done
                    publishedAt
                }
            }
        }
    }
`

export const UPDATED_ACTIONS = gql`
mutation UpdateTodo($id: ID!, $name: String!) {
    updateTodo(id: $id, data: { name: $name, done: true }) {
        data {
            id
            attributes {
                name
                done
            }
        }
    }
}
`

export const DEL_ACTIONS = gql`
mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
        data {
            id
            attributes {
                name
                done
            }
        }
    }
}
`