import ErrorBoundary from "./component/ErrorBoundary";
import Ruhi from "./component/Ruhi";
import Giash from "./component/Giash";
import Kawsar from "./component/Kawsar";
import Rabbi from "./component/Rabbi";
import Mobin from "./component/Mobin";
import Root from "./component/Root";
import PostList from "./component/PostList";
import Post from "./component/Post";
import EditPost from "./component/EditPost";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  BrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />} element={<Root />}>
      <Route path="ruhi" element={<Ruhi />} />
      <Route path="kawsar" element={<Kawsar />} />
      <Route path="mobin" element={<Mobin />} />
      {/* my project route is here */}

      <Route path="giash" element={<Giash />} />
      <Route path="giash" element={<PostList />} />
      <Route path="giash/:id" element={<Post />} />
      <Route path="giash/:id/edit" element={<EditPost />} />

      {/* my project route is here */}
      <Route path="rabbi" element={<Rabbi />} />
    </Route>
  )
); 
const queryClient = new QueryClient()
export default function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
    <div>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
    </QueryClientProvider>
  );
}
