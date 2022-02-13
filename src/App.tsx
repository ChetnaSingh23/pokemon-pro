import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import GalleryContainer from './containers/GalleryContainer';
import PokemonDetailsContainer from './containers/PokemondetailsContainer';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path={'/pokemon/:id'} element={<PokemonDetailsContainer />}/>
          </Routes>
          <Routes>
            <Route path={'/'} element={<GalleryContainer />}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
