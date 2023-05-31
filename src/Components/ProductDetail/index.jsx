import { XMarkIcon } from '@heroicons/react/24/solid'

import './styles.css'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

export const ProductDetail = () => {

  const context = useContext(ShoppingCartContext)

  return (
    <aside 
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden' } product-detail flex-col fixed right-0 bg-white border border-black rounded-lg p-6`}>
      <div className='flex justify-between mb-4'>
        <h2 className='font-medium text-xl'>Detail</h2>
        <div onClick = {context.closeProductDetail} >
          <XMarkIcon className='h-6 w-6 text-black cursor-pointer'/>
        </div>
      </div>
      <figure>
        <img className='w-full h-full rounded-lg' src={context.productToShow?.images[0]} alt={context.productToShow?.title} />
      </figure>
      <p className='flex flex-col py-6'>
        <span className='font-medium text-2xl mb-2'>${context.productToShow?.price}</span>
        <span className='font-medium text-md'>${context.productToShow?.title}</span>
        <span className='font-light text-sm'>${context.productToShow?.description}</span>
      </p>
    </aside>
  )
}
