import React, { Component } from 'react';
import store from '../store';
import { addToCart } from '../actionCreators';
import { v4 } from 'node-uuid'; 

const styles = {
  products: {
    display: 'flex',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  product: {
    width: '220px',
    marginLeft: 10,
    marginRight: 10
  }
};

class ProductList extends Component {
  constructor() {
    super();
    this.handleAddToCart = this.handleAddToCart.bind(this);

    this.state = {
      products: [
        { id: v4(), name: "Hipster Ultimate", price: 299, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-1.jpg" },
        { id: v4(), name: "On Motion Live", price: 99, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-2.jpg" },
        { id: v4(), name: "Underground Max", price: 149, image: "https://s3.amazonaws.com/makeitreal/projects/e-commerce/camiseta-3.jpg" },
      ]
    }

  }

  render() {
    return (
      <div style={styles.products}>
        {this.state.products.map(product =>
          <div style={styles.product} key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>
                <button onClick={() => this.handleAddToCart(product)} role="button" disabled={product.inventory <= 0}>${product.price}</button>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }


  handleAddToCart(product) {
    store.dispatch(addToCart(product));
}
}

export default ProductList;