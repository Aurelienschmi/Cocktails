import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout.jsx';
import './global.css';

import {
  About,
  Home,
  NoMatch,
  CocktailDetail,
} from './pages/';


export default function App() {

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NoMatch />} />
          <Route path='/cocktail/:id' element={<CocktailDetail />} />
          </Route>
      </Routes>
  );
}