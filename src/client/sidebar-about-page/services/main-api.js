import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const credentials = {
  user: 'default',
  password: 'QbMEVqu~VSE6w',
};

const baseUrl = `https://psmmbd2g0q.eu-central-1.aws.clickhouse.cloud`;
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: "((SELECT DISTINCT 'table' as type, TABLE_SCHEMA || '.' || TABLE_NAME as value FROM INFORMATION_SCHEMA.TABLES WHERE table_type = '1' and table_schema <> 'system' order by 1) union all (SELECT DISTINCT 'view' as type, TABLE_SCHEMA || '.' || TABLE_NAME as value FROM INFORMATION_SCHEMA.VIEWS where table_schema NOT in ('INFORMATION_SCHEMA', 'information_schema') order by 1))",
  redirect: 'follow',
};

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getButPostTreeMenu: builder.query({
      query: () => ({
        url: '/',
        method: 'POST',
        body: requestOptions.body,
        params: {
          user: credentials.user,
          password: credentials.password,
          default_format: 'JSON',
          // default_format: "JSONEachRow",
          // default_format: "JSONCompactStringsEachRowWithNames",
        },
        // responseHandler: "text",
      }),
    }),

    // getButPostTreeMenu: builder.mutation({
    //   query: () => ({
    //     url: "/",
    //     method: "POST",
    //     body: requestOptions.body,
    //     headers: {
    //       'Content-Type': 'text/plain',
    //     },
    //     params: {
    //       user: credentials.user,
    //       password: credentials.password,
    //       default_format: "JSONCompactStringsEachRowWithNames",
    //     },
    //   }),
    // }),

    getColumns: builder.query({
      query: (tableName) => ({
        // endpoint not exist in spec
        url: `/uiData/treeMenu/table/columns/${tableName}`,
      }),
    }),
    postSql: builder.mutation({
      query: (sqlQuery) => ({
        // endpoint not exist in spec
        url: `/queryData`,
        method: 'POST',
        body: sqlQuery,
      }),
    }),
  }), // queries to backend
});

export const {
  useGetColumnsQuery,
  usePostSqlMutation,
  useGetButPostTreeMenuQuery,
  // useGetButPostTreeMenuMutation,
} = mainApi;
