import { useState } from "react";

const AddPost = ({setPosts}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const fetchAdd = async(event) => {
    event.preventDefault();

    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1
        })
      })
      if (!response.ok)
        throw new Error ('Ошибка', response.status)
      
      const data = await response.json();
      setPosts((prev) => [data, ...prev]);
      setTitle('');
      setBody('');
      alert('Пост создан');
    } catch (error){
      console.error('Ошибка', error);
    }
  }

  return(
    <form onSubmit={fetchAdd} className="addForm">
      <h2 className="textForm">Добавить новый пост</h2>
      <input
      type="text"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder="Введите название поста"
      />
      <textarea
      rows={5}
      value={body}
      onChange={(event) => setBody(event.target.value)}
      placeholder="Введите текст поста"
      />
      <button type="submit">Добавить</button>
    </form>
  )
}

export default AddPost;