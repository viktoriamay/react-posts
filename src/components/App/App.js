import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Card } from '../Card/Card';
import { Header } from '../Header/Header';
import './App.scss';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const changeInput = (e) => {
    // добавляем в стейт сёрчКвери значение из инпута
    setSearchQuery(e.target.value);
  };

  // создаем функцию фильтрации постов по нажатию на баттон сабмит в сёрче
  const formSubmitRequest = (e) => {
    e.preventDefault();
    // filterPostsRequest();
  };

  return (
    <div className="App">
    
      {/* прокидываем пропсы, => formSubmitRequest={formSubmitRequest} changeInput={changeInput} то же самое что и ниже.  */}
      <Header onSubmit={formSubmitRequest} onInput={changeInput} />

      <main className="main container">
        <Card />
      </main>
    </div>
  );
}

export default App;
