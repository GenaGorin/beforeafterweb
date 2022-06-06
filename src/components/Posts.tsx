import Post from "./Post";
import { connect } from "react-redux";

function Posts({ posts }: any) {
  if (!posts.length) {
    return <p>No posts</p>;
  }

  return (
    <div>
      {posts.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    posts: state.posts.posts,
  };
};

export default connect(mapStateToProps, null)(Posts);
