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

const Search = (props) => { 
  const { search, onSearch } = props;
  

  return (
    <div>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
      <p> Searching for </p>
    </div>
  )
}

const List = (props) =>
(
    <ul>
      {props.list.map((item) => 
        (
          <Item key={item.objectID} item={item} />
   ))}
</ul>
  );

  const Item = (props) => (

  <li>
  <span>
    <a href={props.item.url}>{props.item.title}</a>
     </span>
     
    <span>
     {props.item.author}
    </span> 
    <span>
     {props.item.num_comments}
     </span>
     <span>
       {props .item.points}
       </span>
       </li>
);



export default App;
