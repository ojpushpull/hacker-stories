import * as React from 'react';



const welcome = {
title: 'React',
greeting: 'Heelo'
};
function App() {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
