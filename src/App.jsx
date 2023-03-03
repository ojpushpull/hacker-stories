import * as React from 'react';
import PrimaryButton from './PrimaryButton';




const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value,setValue]
};

const initialStories = [
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

const getAsyncStories = () => 
  new Promise((resolve) => 
  setTimeout(
  () => resolve({ data: { stories: initialStories } }),
  2000
  )
  );

  const storiesReducer = (state, action) => {
   switch (action.type) {
      case 'SET_STORIES':
    return (action.payload)
     case 'REMOVE_STORY':
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      );
   default:
      throw new Error();
    }
    };
  

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

 


const App = () => {

  




const [stories, dispatchStories] = React.useReducer(
  storiesReducer,
 { data: [], isLoading: false, isError: false }
);



React.useEffect(()  => {
  dispatchStories({ type: 'STORIES_FETCH_INIT'});

  getAsyncStories().then((result) => {
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.stories,
    });
  })
  .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
  );
}, []);



const handleRemoveStory = (item) => {
  dispatchStories({
    type: 'REMOVE_STORY',
    payload: item,
  });
};



const [searchTerm, setSearchTerm] = useStorageState(
  'search',
  'React');


const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};





const searchedStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <h1>My hacker story</h1>

      <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearch}
    >
      <strong>Search:</strong>
      </InputWithLabel>
   

    {/* // B */}
      <hr />

    {isError && <p> Something went wrong ... </p>}

    {isLoading ? (
      <p>Loading ... </p>
    ): (
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    )}
    </div>
  );
};

const InputWithLabel = ({ id, label, value, type = 'text', onInputChange, isFocused, children }) => {
  //A
  const inputRef = React.useRef();

  //C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      //D
      inputRef.current.focus();
    }
  }, [isFocused]);
  
  return (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      autoFocus={isFocused}
      onChange={onInputChange}
    />
  </>
);
};

const Search = ({ search, onSearch }) => (

  <React.Fragment>
  <label htmlFor="search"> Search: </label>
    <input 
      
      id="search" 
      type="text" 
      value={search} 
      onChange={onSearch} 
     />
    </React.Fragment>
);


const List = ({list, onRemoveItem}) =>
(
    <ul>
      {list.map((item) => 
        (
          <Item key={item.objectID} 
          item={item}
          onRemoveItem={onRemoveItem}
          />
   ))}
</ul>
  );

  const Item = ({ item, onRemoveItem }) => (
  
    <li>
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
       <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          dismiss
        </button>
       </span>
       </li>
);



export default App;
