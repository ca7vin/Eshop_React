import React, { useState } from 'react';
import imgCoca from './img/coca.png';
import imgSprite from './img/sprite.png';
import imgFanta from './img/fanta.png';

const App = () => {

  const [cash, setCash] = useState(20);


  const [cart, setCart] = useState([]);


  const [products, setProducts] = useState([
    {
      name: 'Coca Cola 33cl',
      price: 1,
      stock: 5,
      image: imgCoca,
      idLink: 'btnCoca',
      color: 'bg-success',
    },
    {
      name: 'Sprite 33cl',
      price: 1.5,
      stock: 5,
      image: imgSprite,
      idLink: 'btnSprite',
      color: 'bg-success',
    },
    {
      name: 'Fanta 33cl',
      price: 2,
      stock: 5,
      image: imgFanta,
      idLink: 'btnFanta',
      color: 'bg-success',
    }
  ]);

  const addToCart = (product, i) => {
    product.stock -= 1
    setCart([...cart, { ...product }])
    setCash(cash - product.price)
    if (product.stock === 1) {
      product.color = 'bg-warning'
    } else if (product.stock === 0){
      product.color = 'bg-danger'
    }
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter(product => product != productToRemove))
    setCash(cash + productToRemove.price)
    let index = 0
    products.forEach((element, i) => {
      if (productToRemove.name === element.name){
        index = i
      }
    });
    products[index].stock += 1
    if (products[index].stock === 1) {
      products[index].color = 'bg-warning'
    } else if (products[index].stock === 0){
      products[index].color = 'bg-danger'
    } else {
      products[index].color = 'bg-success'
    }
  };




  return (
    <div className="container-fluid p-5">
      <div className="row d-flex pb-5">
        <div className="col-6 border d-flex align-items-center justify-content-center">
          <h1>Argent = {cash} €</h1>
        </div>
        <div className="col-6 border d-flex align-items-center justify-content-center">
          <div className="row d-flex">
            <h1 className="text-center">Panier</h1>
            <ul>
              {cart.map((product, i) => (
                <li className="py-3" key={i}>
                  {product.name}, {product.price}
                  <button onClick={() => removeFromCart(product)} className="bouton ms-5 btn btn-danger">remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="row d-flex">
        <h1 className='text-center'>Products</h1>
        {products.map((product, i) => (
          <div className="col-4 p-5 card" key={i}>
            <div className="d-flex align-items-center justify-content-center">
              <img src={product.image} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Prix = {product.price} €</p>
              <p className="card-text">Stock = {product.stock} unités</p>
              <a onClick={() => addToCart(product, i)} href="#" id={product.idLink} className={"btn btn-success " + product.color} >Ajouter</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;