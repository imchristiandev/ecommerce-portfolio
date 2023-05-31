import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const OrdersCard = ( props ) => {
  const { totalPrice, totalProducts } = props
  
  return (
    <section className='flex justify-between items-center border border-black rounded-lg p-4 w-80 mb-4'>
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <span>01.02.23</span>
          <span>{totalProducts} {(totalProducts === 1) ? 'article' : 'articles'} </span>
        </p>
        <p className='flex gap-image.png items-center'>
          <span className='font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon 
            className='h-6 w-6 text-black cursor-pointer'
          />
        </p>
      </div>
    </section>
  )
}

OrdersCard.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalProducts: PropTypes.object.isRequireds
}