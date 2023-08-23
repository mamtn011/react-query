import ErrorBoundary from "./component/ErrorBoundary";
import Ruhi from "./component/Ruhi";
import Giash from "./component/Giash";
import Kawsar from "./component/Kawsar";
import Rabbi from "./component/Rabbi";
import Mobin from "./component/Mobin";
import Root from "./component/Root";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />} element={<Root />}>
      <Route path="ruhi" element={<Ruhi />} />
      <Route path="kawsar" element={<Kawsar />} />
      <Route path="mobin" element={<Mobin />} />
      <Route path="giash" element={<Giash />} />
      <Route path="rabbi" element={<Rabbi />} />
    </Route>
  )
);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
