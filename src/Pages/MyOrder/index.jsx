import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'
import { OrderCard } from '../../Components/OrderCard'

export function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname;
  const index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  const order = (index === 'last') 
    ? context.order?.slice(-1)[0] 
    : context.order[index]

  return (
    <Layout>
      <div className='flex justify-center items-center relative w-80 mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon 
            className='h-6 w-6 text-black cursor-pointer'
          />
        </Link>
        <h1 className='font-medium text-xl'>My Order</h1>
      </div>
      {
        order && (
        order.products.map((product) => (
        <OrderCard
          key={product.id}
          id={product.id}
          title={product.title}
          imageUrl={product.images[0]}
          price={product.price}
        />
        )))
      }
    </Layout>
  );
}
