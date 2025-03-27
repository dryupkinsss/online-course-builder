import React, { useState } from 'react';
import axios from 'axios';

const CreateLesson = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/lessons', { title, content, courseId });
      alert(response.data.message);
    } catch (error) {
      console.error('Ошибка при создании урока:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название урока"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Содержание урока"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID курса"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <button type="submit">Создать урок</button>
    </form>
  );
};

export default CreateLesson;