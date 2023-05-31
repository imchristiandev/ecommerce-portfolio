import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { OrderCard } from '../OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'

export const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter((product) => product.id !== id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }
    context.setOrder([ ...context.order, orderToAdd ])
    context.setCartProducts([])
    context.setCount(0)
    context.setSearchByTitle(null)
  }

  return (
    <aside 
      className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden' } checkout-side-menu flex-col fixed right-0 bg-white border border-black rounded-lg p-6`}>
      <div className='flex justify-between mb-4'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div onClick = {context.closeCheckoutSideMenu} >
          <XMarkIcon className='h-6 w-6 text-black cursor-pointer'/>
        </div>
      </div>
      <div className='px6 overflow-auto flex-1'>
      {
        context.cartProducts.map((product) => (
          <OrderCard 
            key={product.id} 
            id={product.id}
            title={product.title} 
            imageUrl={product.images[0]}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))
      }
      </div>
      <footer>
        <p className='flex justify-between items-center'>
          <span className='font-light'>Total</span>
          <span className='font-medium text-2xl'>${ totalPrice(context.cartProducts) }</span>
        </p>
        <Link to='/my-orders/last'>
          <button 
            className='w-full bg-black py-3 text-white rounded-lg'
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </footer>
    </aside>
  )
}
