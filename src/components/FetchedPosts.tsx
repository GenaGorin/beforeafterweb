import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions";
import Loader from "./Loader/Loader";
import Post from "./Post";

function FetchedPosts() {
  const dispatch = useDispatch();
  const posts: any = useSelector((state: any) => state.posts.fetchedPosts);

  const loading = useSelector((state: any) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => dispatch(fetchPosts())}
      >
        Загрузить
      </button>
    );
  }
  return posts.map((post: any) => <Post key={post.id} post={post} />);
}

export default FetchedPosts;
