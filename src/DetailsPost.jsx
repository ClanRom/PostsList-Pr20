import { useState } from 'react';

const DetailsPost = ({id}) => {
  const [postDetails, setPostDetails] = useState('');
  const [isDisabled, setIsDesabled] = useState(false);

  const fetchPostsId = async() => {
    try{
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok)
        throw new Error ('Ошибка', response.status)
      
      const data = await response.json();
      setIsDesabled(true);
      setPostDetails(data.body);
    } catch (error){
      console.error('Ошибка', error);
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
