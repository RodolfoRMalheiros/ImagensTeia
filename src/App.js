// App.js
import React, { useEffect, useState } from 'react';
import Photo from './Photo';
import Pagination from './Pagination'; // Importe o componente Pagination
import { FaShoppingCart } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";
import Button from '@material-ui/core/Button';



const App = () => {
  const [allData, setAllData] = useState([]); // Todos os dados
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAlbum, setSearchAlbum] = useState('');
  const [searchId, setSearchId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]); // Novo estado para o carrinho
  const [showLiked, setShowLiked] = useState(false); // Novo estado para mostrar curtidas
  const [isCartOpen, setIsCartOpen] = useState(false); // Novo estado para o carrinho
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' para crescente, 'desc' para decrescente

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(json => setAllData(json.map(photo => ({ ...photo, liked: false })))) // Adiciona a propriedade 'liked' a cada foto
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    let results = allData.filter(photo => {
      const titleMatch = photo.title.toLowerCase().includes(searchTitle.toLowerCase());
      const albumMatch = searchAlbum ? photo.albumId.toString() === searchAlbum : true;
      const idMatch = searchId ? photo.id.toString() === searchId : true;
      const likedMatch = showLiked ? photo.liked : true;
      return titleMatch && albumMatch && idMatch && likedMatch;
    });

    // Ordena os resultados
  results.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const photosPerPage = 8;
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const photosToDisplay = results.slice(startIndex, endIndex);

  setFilteredData(photosToDisplay);
}, [searchTitle, searchAlbum, searchId, allData, currentPage, showLiked, sortDirection]); // Adicione sortDirection às dependências

  const addToCart = (photo) => {
    setCart([...cart, photo]);
  };

  const removeFromCart = (photo) => {
    setCart(cart.filter(p => p.id !== photo.id));
  };

  const toggleLike = (photo) => {
    const updatedPhoto = { ...photo, liked: !photo.liked };
    setAllData(allData.map(p => p.id === photo.id ? updatedPhoto : p));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    window.scrollTo(0, 0); // Rola para o topo da página
  };

  const loadPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
     <div style={{ position: 'fixed', top: '20px', right: '30px' }}>
      <button className="cartButton" onClick={toggleCart}>
       {isCartOpen ? 'Fechar carrinho' : `Meu Carrinho (${cart.length})`}
      </button>
     </div>


      {isCartOpen && (
        <div>
          <h2>Carrinho</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {cart.map(photo => (
              <Photo key={photo.id} photo={photo} addToCart={addToCart} removeFromCart={removeFromCart} toggleLike={toggleLike} isCartOpen={isCartOpen} /> // Passando removeFromCart e isCartOpen como props
          ))}
        </div>
        </div>
      )}
      <div style={{ margin: '20px 30px 30px 30px' }}>
        <h1 style={{ textAlign: 'center', margin: '30px 40px 40px 40px' }}>Imagens Teia - Suas fotos inesquecíveis estão aqui!</h1>
      

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', margin: '25px 25px 10px 15px'}}>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            placeholder="Buscar por título..."
          />
          <Button variant="contained" color="secondary" onClick={() => setSearchTitle('')}>   Limpar </Button>
          </div>

          <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={searchAlbum}
            onChange={e => setSearchAlbum(e.target.value)}
            placeholder="Buscar por álbum ID..."
          />
          <Button variant="contained" color="secondary" onClick={() => setSearchAlbum('')}>Limpar</Button>
          </div>

          <div style={{ display: 'flex' }}>
          <input
            type="number"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="Buscar por ID..."
          />
          <Button variant="contained" color="secondary" onClick={() => setSearchId('')}>Limpar</Button>
          </div>

          <Button variant="contained" color="primary" onClick={toggleSortDirection}>  Ordenar ({sortDirection === 'asc' ? 'Crescente' : 'Decrescente'}) </Button>

          <Button variant='contained' color='violet' onClick={() => { setSearchTitle(''); setSearchAlbum(''); setSearchId(''); setShowLiked(!showLiked)}}> {showLiked ? 'Mostrar todas' : 'Mostrar curtidas'}</Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredData.map(photo => (
            <Photo key={photo.id} photo={photo} addToCart={addToCart} toggleLike={toggleLike} /> // Passando addToCart e toggleLike como props
          ))}
        </div>
        <Pagination currentPage={currentPage} loadPage={loadPage} /> 
        </div>
      </div>
  
  );
};

export default App;

