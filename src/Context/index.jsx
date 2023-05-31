import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
    // Shopping card - Increment Quantity
    const [count, setCount] = useState(0)

    // Product detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false )
    const openProductDetail = () => { setIsProductDetailOpen(true) }
    const closeProductDetail = () => { setIsProductDetailOpen(false) }

    // Checkout Side Menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false )
    const openCheckoutSideMenu = () => { setIsCheckoutSideMenuOpen(true) }
    const closeCheckoutSideMenu = () => { setIsCheckoutSideMenuOpen(false) }
    
    // Product detail - show product
    const [productToShow, setProductToShow] = useState({
        title: "",
        price: "",
        description: "",
        images: [],
    });
    
    // Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart - Order
    const [order, setOrder] = useState([])

    // Get Products
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)

    console.log(filteredItems)

    // Search by title
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Search by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
        fetch( 'https://api.escuelajs.co/api/v1/products' )
            .then(response => response.json())
            .then(data => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter( (item) => item.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter( (item) => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()) )
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE')
            return filteredItemsByTitle(items, searchByTitle)
        
        if (searchType === 'BY_CATEGORY')
            return filteredItemsByCategory(items, searchByCategory)

        if (searchType === 'BY_TITLE_AND_CATEGORY')
            return  filteredItemsByCategory(items, searchByCategory).filter(item =>  item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        
        if (!searchType) 
            return items
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [ items, searchByTitle, searchByCategory ])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            isProductDetailOpen,
            openProductDetail,
            closeProductDetail,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider> 
    )
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}