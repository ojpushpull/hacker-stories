import * as React from 'react';

const list = [
  {
    title: 'React',
    url: 'http://reeactjs.org',
    author: 'Jordan alke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'http://redux.js.org',
    author: 'Dan abramov, andrew clarke',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];



function App() {
  return (
    <div>
      <h1>My hacker story</h1>

      <Search />
      <hr />

      <List />
    </div>
  );
}

const Search = () => {
  const handleChange = (event) =>
  console.log(event);
  console.log(event.target.value);
  return (
    <div>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
    </div>
  )
}

function List(){
  return (
    <ul>
      {list.map(function (item) {
        return (
    <li key={item.objectID}>
       <span>
         <a href={item.url}>{item.title}</a>
          </span>
          
         <span>
          {item.author}
         </span> 
         <span>
          {item.num_comments}
          </span>
          <span>
            {item.points}
            </span>
            </li>
  );
})}
</ul>
  );
}

export default App;
