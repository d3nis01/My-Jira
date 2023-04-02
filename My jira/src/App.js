import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import { Route, Routes, Navigate } from "react-router-dom";
import SinglePost from "./features/posts/SinglePost";
import AddUserForm from "./features/users/AddUserForm";
import AddStatusForm from "./features/posts/AddStatusForm";
import MyPostCategory from "./features/posts/MyPostCategory";
import NavBar from "./features/elements/NavBar";
import PostsListView from "./features/posts/PostsListView";
import StatusesList from "./features/posts/StatusesList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route index element={<MyPostCategory />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
          <Route path="list" element={<PostsListView />} />
          <Route path="list/:postId" element={<SinglePost />} />
        </Route>
        <Route path="user">
          <Route index element={<AddUserForm />}/>
          <Route path=":userId" element={1} />
          <Route path="edit/:userId" element={1} />
        </Route>
        <Route path="status">
          <Route index element={<AddStatusForm />}/>
          <Route path="list" element={<StatusesList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
