import * as React from 'react';
import PrimaryButton from './PrimaryButton';
import axios from 'axios';




const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value,setValue]
};





  const storiesReducer = (state, action) => {
   switch (action.type) {
      case 'STORIES_FETCH_INIT':
    return {
      ...state,
      isLoading: true,
      isError: false,
    };

     case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
  case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
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

 

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

  




const [stories, dispatchStories] = React.useReducer(
  storiesReducer,
 { data: [], isLoading: false, isError: false }
);

const [searchTerm, setSearchTerm] = useStorageState(
  'search',
  'React');

const [url, setUrl] = React.useState(
  `${API_ENDPOINT}${searchTerm}`
);

const handleFetchStories = React.useCallback(() =>  {
   if (!searchTerm) return;

  dispatchStories({ type: 'STORIES_FETCH_INIT'});
  
  axios
  .get(url)
  .then((response) => response.json())
  .then((result) => {
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits,
    });
  })
  .catch(() => 
  dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
  );
}, [url]);


React.useEffect(()  => {
  handleFetchStories();
}, [handleFetchStories]);

 
const handleSearchInput = (event) => {
  setSearchTerm(event.target.value);
};

const handleSearchSubmit = () => {
  setUrl(`${API_ENDPOINT}${searchTerm}`);
};



const handleRemoveStory = (item) => {
  dispatchStories({
    type: 'REMOVE_STORY',
    payload: item,
  });
};





const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

  return (
    <div>
      <h1>My hacker story</h1>

      <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search:</strong>
      </InputWithLabel>
   <button 
   type="button"
   disabled={!searchTerm}
   onClick={handleSearchSubmit}
   >
    Submit
   </button>

    {/* // B */}
      <hr />

    {stories.isError && <p> Something went wrong ... </p>}

    {stories.isLoading ? (
      <p>Loading ... </p>
    ): (
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
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
