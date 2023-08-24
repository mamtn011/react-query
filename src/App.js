import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorBoundary from "./component/ErrorBoundary";
import Giash from "./component/Giash";
import Kawsar from "./component/Kawsar";
import Mobin from "./component/Mobin";
import Rabbi from "./component/Rabbi";
import Root from "./component/Root";
import Ruhi from "./component/Ruhi";

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
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
