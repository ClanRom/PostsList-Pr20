import './App.css'
import { useState } from 'react';
import PostsList from './PostsList'

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [isDisplay, setIsDesabled] = useState(false);

  const fetchPosts = async() => {
    try{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if (!response.ok)
      throw new Error ('Ошибка', response.status);

    const data = await response.json();
    setIsDesabled(true);
    setPosts(data);
    } catch (errror){
      console.error('Ошибка: ', errror);
    }
  }

  const fetchDeletePost = async(id) => {
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok)
        throw new Error ('Ошибка', response.status)

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error){
      console.error('Ошибка', error);
    }
  }

  return (
    <div className="board-row">
      <button onClick={fetchPosts} style={{display: isDisplay ? 'none' : 'block'}}>Загрузить посты</button>
      <div style={{display: isDisplay ? 'block' : 'none'}}>
        <PostsList
          posts = {posts}
          fetchDeletePost = {fetchDeletePost}
          setPosts = {setPosts}
        />
      </div>
    </div>
  );
}
