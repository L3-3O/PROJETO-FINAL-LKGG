import React, { useState } from 'react';
import './App.css';
import './Cart.css';
import Cart from './Cart.jsx';
import logo from './assets/Logo.png';
import bibliotecaImg from './assets/biblioteca.png'; 
import searchIcon from './assets/search.svg';
import addIcon from './assets/add.png';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';
import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg';
import img8 from './assets/img8.jpg';
import img9 from './assets/img9.jpg';
import img10 from './assets/img10.jpg';
import img11 from './assets/img11.jpg';
import img12 from './assets/img12.jpg';
import img13 from './assets/img13.jpg';
import img14 from './assets/img14.webp';
import img15 from './assets/img15.jpg';
import img16 from './assets/img16.jpeg';

function App() {
  const [products, setProducts] = useState([
    { name: 'Verity - Colleen Hoover', price: 39.91, image: img1 },
    { name: 'A revolução dos bichos - George Orwell', price: 15.00, image: img2 },
    { name: 'A empregada - Freida McFadden', price: 45.52, image: img3 },
    { name: 'É assim que acaba - Colleen Hoover', price: 40.49, image: img4 },
    { name: 'É assim que começa - Colleen Hoover', price: 40.49, image: img5 },
    { name: 'A Biblioteca da Meia-Noite - Matt Haig', price: 41.93, image: img6 },
    { name: 'Tudo é rio - Carla Madeira', price: 49.72, image: img7 },
    { name: 'Jantar secreto - Raphael Montes', price: 44.29, image: img8 },
    { name: 'Nada pode me ferir - David Goggins', price: 42.45, image: img9 },
    { name: 'Walden - Henry D. Thoreau', price: 39.44, image: img10 },
    { name: 'Como ler livros', price: 220.00, image: img11 },
    { name: 'Fluente para sempre - Gabriel Wyne', price: 69.14, image: img12 },
    { name: 'Aprendendo a aprender - Barbara Oakley', price: 50.02, image: img13 },
    { name: 'Eterna Vigilância - Edward Snowden', price: 23.99, image: img14 },
    { name: '1984 - George Orwell', price: 18.40, image: img15 },
    { name: 'Um Estudo em Vermelho', price: 50.18, image: img16 },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const addProductToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeProductFromCart = (index) => {
    setCartItems(cartItems.filter((item, i) => i !== index));
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const editProduct = (updatedProduct) => {
    const updatedProducts = products.map((product, index) =>
      index === productToEdit.index ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setProductToEdit(null);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((product, i) => i !== index));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const openEditModal = (product, index) => {
    setProductToEdit({ ...product, index });
    setIsModalOpen(true);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <img src={logo} className="logo" alt="Good Books Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar por Produtos" />
          <button>
            <img src={searchIcon} alt="Search" className="logo-btn" />
          </button>
        </div>
        <div className="header-icons">
          <button>
            <img src={addIcon} alt="Cadastrar Produto" className="logo-btn" onClick={openModal} />
          </button>
          <button onClick={toggleCart} className="cart-button">
            <img src={bibliotecaImg} alt="Carrinho" className="cart-icon" />
          </button>
        </div>
      </header>

      <div className="banner">
        <span>Bem vindo ao Good Books!</span>
      </div>

      <main>
        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">
                R$
                {typeof product.price === 'number' 
                  ? product.price.toFixed(2)
                  : 'Preço Inválido'}
              </p>
              <button className="btn-add" onClick={() => addProductToCart(product)}>Adicionar ao Carrinho</button>
              <button className="btn-edit" onClick={() => openEditModal(product, index)}>Editar</button>
              <button className="btn-remove" onClick={() => removeProduct(index)}>Remover</button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>
          &copy; 2025 Good Books | <a href="#">Termos de Uso</a> | <a href="#">Política de Privacidade</a>
        </p>
      </footer>

      {isCartOpen && (
        <Cart 
          cartItems={cartItems} 
          removeProductFromCart={removeProductFromCart} 
        />
      )}

      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          addProduct={addProduct} 
          editProduct={editProduct} 
          productToEdit={productToEdit} 
        />
      )}
    </div>
  );
}

export default App;