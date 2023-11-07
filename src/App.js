import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productID = product.id

    const isPresent = cartList.some(e => e.id === productID)
    // console.log(isPresent)
    // console.log(product)

    if (!isPresent) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
    } else {
      const incremItem = cartList.find(e => productID === e.id)

      incremItem.quantity += 1

      this.setState({...cartList, incremItem})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const incremItem = cartList.find(e => id === e.id)

    incremItem.quantity += 1
    console.log(incremItem)
    console.log({...cartList, incremItem})

    this.setState({...cartList, incremItem})
    console.log(cartList)
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decreItem = cartList.find(e => id === e.id)
    if (decreItem.quantity > 1) {
      decreItem.quantity -= 1

      this.setState({...cartList, decreItem})
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(e => e.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
