import React, { useState, useEffect } from 'react';
import './ProductModal.css'; 

function ProductModal({ isOpen, onClose, addProduct, editProduct, productToEdit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString().replace('.', ','));
      setImage(null); 
    } else {
      setName('');
      setPrice('');
      setImage(null);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericPrice = parseFloat(price.replace(',', '.'));

    if (isNaN(numericPrice)) {
      alert('Por favor, insira um preço válido!');
      return;
    }

    if (!image && !productToEdit) {
      alert('Por favor, selecione uma imagem!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const product = { name, price: numericPrice, image: reader.result };
      if (productToEdit) {
        editProduct(product);
      } else {
        addProduct(product);
      }
      setName('');
      setPrice('');
      setImage(null);
      onClose(); 
    };

    if (image) {
      reader.readAsDataURL(image);
    } else {
      const product = { name, price: numericPrice, image: productToEdit.image };
      editProduct(product);
      setName('');
      setPrice('');
      setImage(null);
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>{productToEdit ? 'Editar Produto' : 'Cadastro de Produto'}</h2>
          <form className="product-form" onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Preço:</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Imagem:</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required={!productToEdit}
              />
            </div>
            <button type="submit">{productToEdit ? 'Salvar' : 'Adicionar Produto'}</button>
          </form>
        </div>
      </div>
    )
  );
}

export default ProductModal;