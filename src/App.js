import ErrorBoundary from "./component/ErrorBoundary";
import Ruhi from "./component/Ruhi";
import Kawsar from "./component/Kawsar";
import Rabbi from "./component/Rabbi";
import Mobin from "./component/Mobin";
import Root from "./component/Root";

import MobinEdit from "./mobin/MobinEdit";
/// Gias_Uddin ---- 
import Giash from "./component/Giash";
import PostList from "./giasuddin/PostList";
import Post from "./giasuddin/Post";
import EditPost from "./giasuddin/EditPost";


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />} element={<Root />}>
      <Route path="ruhi" element={<Ruhi />} />
      <Route path="kawsar" element={<Kawsar />} />
      <Route path="mobin" element={<Mobin />} />
      <Route path="mobin-edit/:id" element={<MobinEdit />} />

      {/* Gias uddin start his working form here */}
      <Route path="giash" element={<Giash />} />
      <Route path="giash" element={<PostList />} />
      <Route path="giash/:id" element={<Post />} />
      <Route path="giash/:id/edit" element={<EditPost />} />
      {/* END */}

      <Route path="rabbi" element={<Rabbi />} />
    </Route>
  )
);
export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
