import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/courses', { title, description, author });
      alert(response.data.message);
    } catch (error) {
      console.error('Ошибка при создании курса:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название курса"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание курса"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Автор курса"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Создать курс</button>
    </form>
  );
};

export default CreateCourse;