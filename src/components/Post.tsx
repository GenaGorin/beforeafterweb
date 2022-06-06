function Post({ post }: any) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <div>{post.title}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
