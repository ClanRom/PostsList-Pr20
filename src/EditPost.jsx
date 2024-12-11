import { useState } from "react";

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
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body
        })
      })
      if (!response.ok)
        throw new Error ('Ошибка', response.status)
      
      const data = await response.json();
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
      console.error('Ошибка', error);
      setIsDesabled(false);
    }
  }

  return(
    <>
    <button onClick={display}>Редактировать</button>
    <form className="model" onSubmit={fetchAdd} style={{display: isDisplay ? 'flex' : 'none'}}>
      <h2 className="textForm">Редактор поста</h2>
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
      <button type="submit">Изменить</button>
    </form>
    </>
  )
}

export default EditPost;