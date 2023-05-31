import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/solid'

export const OrderCard = ( props ) => {
  const { id, title, imageUrl, price, handleDelete } = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon 
      onClick={() => handleDelete(id)}
      className='h-6 w-6 text-black cursor-pointer'
    />
  }
  return (
    <section className='flex justify-between items-center mb-3 w-80'>
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      {renderXMarkIcon}
      
      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium'>{price}</p>
        { renderXMarkIcon }
      </div>
    </section>
  )
}

OrderCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  handleDelete: PropTypes.func
}