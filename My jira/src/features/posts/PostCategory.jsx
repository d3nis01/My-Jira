import { useSelector } from "react-redux";
import PostsList from "./PostsList";
import { useGetStatusesQuery, selectAllStatuses } from "./statusesSlice";
import { selectAllPosts } from "./postsSlice";

const PostCategory = () => {

    const {
        isLoading1,
        isSucces1,
        isError1,
        error1
    } = useGetStatusesQuery()

    const allStatuses = useSelector(selectAllStatuses);
    const allPosts = useSelector(selectAllPosts)
    
    const allApearingCategories = allStatuses.map(status => {
      const allPostsFiltered = allPosts.filter(post => post.currentStatus === status.title);
      if (allPostsFiltered.length > 0) {
        return <PostsList key={status.id} posts={allPostsFiltered} status={status} />;
      }
    })

  return (
    <div className="PostCategory">
      {allApearingCategories}
    </div>
  )
}

export default PostCategory