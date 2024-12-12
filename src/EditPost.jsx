import { useState } from "react";
import axios from 'axios';

const EditPost = ({setPosts, post}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isDisplay, setIsDesabled] = useState(false);

  const display = () => {
    setIsDesabled(true);
    setTitle(post.title);
    setBody(post.body);
  }

  const fetchAdd = async(event) => {
    event.preventDefault();

    try{
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, { title, body})
      
      const data = response.data;
      setPosts((prev) => prev.map((prevPost) => {
        if (prevPost.id === post.id){
          return data;
        } else {
          return prevPost;
        }
      }));
      setTitle('');
      setBody('');

      setIsDesabled(false);
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

  return(
    <>
    <button onClick={display}>Редактировать</button>
    <form className="model" onSubmit={fetchAdd} style={{display: isDisplay ? 'flex' : 'none'}}>
      <h2 className="text-form">Редактор поста</h2>
      <input
      type="text"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder="Введите название поста"
      required
      />
      <textarea
      rows={5}
      value={body}
      onChange={(event) => setBody(event.target.value)}
      placeholder="Введите текст поста"
      required
      />
      <button type="submit">Изменить</button>
    </form>
    </>
  )
}

export default EditPost;