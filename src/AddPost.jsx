import { useState } from "react";
import axios from 'axios';

const AddPost = ({setPosts}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const fetchAdd = async(event) => {
    event.preventDefault();

    try{
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {title, body, userId: 1})
      
      const data = response.data;

      setPosts((prev) => [data, ...prev]);
      setTitle('');
      setBody('');
      alert('Пост создан');
    } catch (error){
      if (error.response)
        console.error('Ошибка HTTP запроса: ', error.response.status);
      else if (error.request)
        console.error('Нет ответа от сервера: ', error.request);
      else
        console.error('Ошибка: ', error.message)
    }
  }

  return(
    <form onSubmit={fetchAdd} className="add-form">
      <h2 className="text-form">Добавить новый пост</h2>
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
      <button type="submit">Добавить</button>
    </form>
  )
}

export default AddPost;