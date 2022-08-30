import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './pages/Home';
import Search from './pages/Search';
import PetPage from './pages/Pet';
import Profile from './pages/Profile';
import MyPetsPage from './pages/MyPets';

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <main className="pb-3">
            <Container>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pet/:id" element={<PetPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mypets" element={<MyPetsPage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
