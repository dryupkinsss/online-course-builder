import React from 'react';
import Register from './Register';
import CreateCourse from './CreateCourse';
import CreateLesson from './CreateLesson';

function App() {
  return (
    <div>
      <h1>Конструктор курсов</h1>
      <Register />
      <CreateCourse />
      <CreateLesson />
    </div>
  );
}

export default App;