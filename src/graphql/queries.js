// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getAssetTable6ce042e = `query GetAssetTable6ce042e($id: String!, $ts: Int!) {
  getAssetTable6ce042e(id: $id, ts: $ts) {
    id
    ts
  }
}
`;
export const listAssetTable6ce042es = `query ListAssetTable6ce042es(
  $filter: TableAssetTable6ce042eFilterInput
  $limit: Int
  $nextToken: String
) {
  listAssetTable6ce042es(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ts
    }
    nextToken
  }
}
`;
