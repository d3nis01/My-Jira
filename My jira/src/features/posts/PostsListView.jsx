import { useSelector } from "react-redux"
import ListElement from "./ListElement";
import { selectAllPosts, useGetPostsQuery } from "./postsSlice"
import './listview.css'

const PostsListView = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

    const allPosts = useSelector(selectAllPosts);

    let content;
    if (isLoading) {
        content = <p>Posts are loading...</p>
    } else if (isSuccess) {
        content = allPosts.map((post) => (
            <ListElement post={post} />
        ));
    } else if (isError) {
        content = <p>{error}</p>;
    }

  return (
    <div className="PostsListView">
        <div className="statuseslist-title">Posts : </div>
        {content}
    </div>
  )
}

export default PostsListView