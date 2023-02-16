import * as React from 'react';





const App = () => {
  const stories = [
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

const [searchTerm, setSearchTerm] = React.useState('React');

const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

const searchedStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <h1>My hacker story</h1>

    {/* // B */}
      <Search search={searchTerm} onSearch={handleSearch}/>
      <hr />

      <List list={searchedStories}/>
    </div>
  );
}

const Search = ({ search, onSearch }) => { 
  

  return (
    <div>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
      <p> Searching for </p>
    </div>
  )
}

const List = ({list}) =>
(
    <ul>
      {list.map((item) => 
        (
          <Item key={item.objectID} 
          title={item.title}
          url={item.url}
          author={item.author}
          num_comments={item.num_comments}
          points={item.points} />
   ))}
</ul>
  );

  const Item = ({ title, url, author, points, num_comments}) => (

  <li>
  <span>
    <a href={url}>{title}</a>
     </span>
     
    <span>
     {author}
    </span> 
    <span>
     {num_comments}
     </span>
     <span>
       {points}
       </span>
       </li>
);



export default App;
