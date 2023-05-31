/*
 * This function calculates total price of a new order
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} Total price
 */

export const totalPrice = (productList) => {
  let totalPrice = 0
  productList.forEach( product => totalPrice += product.price )
  return totalPrice
}