import { useState } from 'react';
import axios from 'axios';

const DetailsPost = ({id}) => {
  const [postDetails, setPostDetails] = useState('');
  const [isDisabled, setIsDesabled] = useState(false);

  const fetchPostsId = async() => {
    try{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

      setIsDesabled(true);
      setPostDetails(response.data.body);
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
    <>
      <p>{postDetails}</p>
      <button onClick={fetchPostsId} disabled={isDisabled}>Подробнее</button>
    </>
  )
}

export default DetailsPost;
