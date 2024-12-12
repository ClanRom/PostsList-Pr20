import './App.css'
import { useState } from 'react';
import PostsList from './PostsList'
import axios from 'axios';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [isDisplay, setIsDesabled] = useState(false);

  const fetchPosts = async() => {
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      
      setIsDesabled(true);
      setPosts(response.data);
    } catch (error){
      if (error.response)
        console.error('Ошибка HTTP запроса: ', error.response.status);
      else if (error.request)
        console.error('Нет ответа от сервера: ', error.request);
      else
        console.error('Ошибка: ', error.message)
      
      setIsDesabled(false);
    }
  }

  const fetchDeletePost = async(id) => {
    try{
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error){
      if (error.response)
        console.error('Ошибка HTTP запроса: ', error.response.status);
      else if (error.request)
        console.error('Нет ответа от сервера: ', error.request);
      else
        console.error('Ошибка: ', error.message)
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
