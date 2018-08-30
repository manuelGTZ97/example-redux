import React, { Component } from 'react';
import store from '../store';
import { saveState } from '../localStorage';
import { loadStorage } from '../localStorage';
import throttle from 'lodash/throttle';
import { removeFromCart } from '../actionCreators';

const styles = {
  footer: {
    fontWeight: 'bold'
  }
}


class ShoppingCart extends Component {
  constructor() {
    super();
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);

    this.state = {
      cart: store.getState().cart
    };


  }

  componentDidMount(){
    store.subscribe(throttle(() => {
        saveState(store.getState());
        this.setState({
            cart: store.getState().cart
        });
      },1000));
  }

  render() {
    return (
        <table>
          <tbody>
            {this.state.cart.map(product =>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td><button onClick={() => this.handleRemoveFromCart(product)}>Delete</button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={styles.footer}>
                Total: ${this.state.cart.reduce((sum, product) => sum + product.price, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
    )
  }

  handleRemoveFromCart(product) {
    store.dispatch(removeFromCart(product))
  }
}

export default ShoppingCart;