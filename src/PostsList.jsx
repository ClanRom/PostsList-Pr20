import DetailsPost from './DetailsPost';
import AddPost from './AddPost';
import EditPost from './EditPost';

const PostsList = ({posts, fetchDeletePost, setPosts}) => {
  return(
    <>
      <AddPost 
      setPosts = {setPosts}
      />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <DetailsPost id = {post.id} />
            <button onClick={() => fetchDeletePost(post.id)}>Удалить</button>
            <EditPost setPosts = {setPosts} post = {post} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsList;