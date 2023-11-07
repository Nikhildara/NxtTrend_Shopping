import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      let totalValue
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      if (!showEmptyView) {
        // console.log(cartList)

        totalValue = cartList.reduce(
          (total, e) => total + e.quantity * e.price,
          0,
        )
        console.log(totalValue)
      }
      const itemsCon = cartList.length

      const clearCart = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-btn-con">
                  <button
                    className="remove-all"
                    type="button"
                    onClick={clearCart}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <div className="summary-flex">
                  <div className="summary-con">
                    <h1 className="total-amount">
                      Order Total:
                      <span className="span-value"> Rs {totalValue}/-</span>
                    </h1>
                    <p className="quantity-cart">{itemsCon} Items in cart</p>
                    <button className="checkout-btn" type="button">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
