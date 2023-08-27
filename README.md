# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# Note by Mobin

### 1. What is React Query?

React Query is a JavaScript library designed to simplify and optimize data fetching and state management in React applications.

---

### 2. Key features of React Query.

- **Data Fetching:** It supports various data fetching techniques like RESTful APIs, GraphQL queries, and more.

- **Caching and Background Fetching:** It automatically caches fetched data, reducing redundant network requests. It also supports background data fetching, ensuring data is up-to-date while minimizing the impact on user experience.

- **Query Invalidation and Refetching:** The library offers tools to automatically refetch data when components are re-rendered.

- **Optimistic Updates:** It allowing you to update the UI optimistically while the actual network request is pending. If the request fails, it can automatically revert to the correct state.

- **Pagination and Infinite Loading:** It provides utilities for handling paginated data and implementing infinite scrolling, making it easier to work with large datasets.

- **Mutation Management:** It simplifies managing data mutations, including sending data to the server and updating the cache optimally.

- **Global and Local State:** While it's primarily focused on data fetching, React Query also offers tools for managing global and local application state.

---

### 3. Installation

npm i @tanstack/react-query  
or  
yarn add @tanstack/react-query

**N.B:** _It is recommended to also use ESLint Plugin Query to help you catch bugs and inconsistencies while you code ( npm i -D @tanstack/eslint-plugin-query )_

---

### 4. Guidelines

1. To use react query, at first we have to import 'QueryClient' and 'QueryClientProvider' in root derectory.

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
```

2. Then we we have to create an istance of QueryClient and cover up app component by QueryClientProvider with client prop.

```js
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;
```

3. Now we can fetch data from server/APIs using useQuery hook. we have to import it first and then use like this...

```js
import { useQuery } from "@tanstack/react-query";

const getData = () => {
  return axios.get("https://mamtn011.github.io/crud/db.json");
};

//export default function Mobin() {
const result = useQuery({ queryKey: ["employee"], queryFn: getData });
console.log(result);
//return <div>Mobin</div>;
//}
```

Here, result is an object where we get data, error, isLoading, isError, isSuccess and more.. so we can destracture it like..

```js
const { data, error, isLoading } = useQuery({
  queryKey: ["employee"],
  queryFn: getData,
});
console.log(data);
```
