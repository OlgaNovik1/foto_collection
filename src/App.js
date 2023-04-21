import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './components/Collection';



function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ];

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ''


    fetch(`https://64410e39792fe886a89d1253.mockapi.io/galery?page=${page}&limit=6&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка...');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading
          ? (<h2>Идет загрузка...</h2>)
          : (collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />)
            ))}
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
            <li key={i} onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
