import { gql } from '@apollo/client';

export const GET_TODOS = gql`
query {
  getTodos {
    ... on TodoListResult {
      statusCode
      data {
        id
        title
      }
      success
      message
      errors
    }

    ... on ErrorResponse {
        statusCode
        success
        message
        errors
    }
  }
}`;

export const ADD_TODO = gql`
mutation CreateTodo($title: String!) {
  createTodo(title: $title) {
    ... on TodoResult {
      statusCode
      data {
        id
        title
      }
      success
      message
      errors
    }

    ... on ErrorResponse {
        statusCode
        success
        message
        errors
    }
  }
}`;

export const UPDATE_TODO = gql`
mutation UpdateTodo($id: ID!, $title: String!) {
  updateTodo(id: $id, title: $title) {
    ... on TodoResult {
      statusCode
      data {
        id
        title
      }
      success
      message
      errors
    }

    ... on ErrorResponse {
        statusCode
        success
        message
        errors
    }
  }
}`;

export const DELETE_TODO = gql`
mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    ... on TodoResult {
      statusCode
      data {
        id
        title
      }
      success
      message
      errors
    }

    ... on ErrorResponse {
        statusCode
        success
        message
        errors
    }
  }
}`;