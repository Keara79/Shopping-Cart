  /* Product array */
  const products = [
 {
  name: "Cherry",
  price: 4,
  quantity: 0,
  productId: 1,
  image: "./images/cherry.jpg"
 },
 {
  name: "Strawberry",
  price: 5,
  quantity: 0,
  productId: 2,
  image: "./images/strawberry.jpg"
 },
 {
  name: "Orange",
  price: 10,
  quantity: 0,
  productId: 3,
  image: "./images/orange.jpg"
 }
 ];
     /* Empty cart */
  const cart = [];

  function addProductToCart(productId) {
    /* Adds product to cart */
    const product = products.find((product) => product.productId === productId);
    
    /* If the product is already in the cart increase quantity */
    if (product) {
      const existingProduct = cart.find((p) => p.productId === productId);
      if (existingProduct) {
        /* If the product already exists in the cart, increase its quantity */
        existingProduct.quantity++;
      } else {
        /* If the product doesn't exist in the cart, add it with a quantity of 1 */
        product.quantity = 1;
        cart.push(product);
      }
    }
  }

  function increaseQuantity(productId) {
    /* Finds the product in the cart based on the productId */
    function findProductById(productId) {
      return cart.find((p) => p.productId === productId);
    }
    
    /* Finds the product in the cart */
    const product = findProductById(productId);
    
    /* Increases the quantity of the product */
    if (product) {
      /* If the product is found in the cart, increase its quantity */
      product.quantity++;
    }
  }

  function decreaseQuantity(productId) {
    const productIndex = cart.findIndex((product) => product.productId === productId);
    
    /* Finds the product in the products array based on the productId */
    if (productIndex !== -1) {
      const product = cart[productIndex];
      product.quantity--;
      
      /* If the quantity becomes 0, remove the product from the cart */
      if (product.quantity === 0) {
        cart.splice(productIndex, 1);
      }
    }
  }

  function removeProductFromCart(productId) {
    /* Finds the index of the product in the cart based on the productId */
    const productIndex = cart.findIndex((product) => product.productId === productId);
    
    /* Removes the product from the cart */
    if (productIndex !== -1) {
      /* If the product is found in the cart */
      const product = cart[productIndex];
      product.quantity = 0;
      /* Sets the quantity of the product to 0 */
      cart.splice(productIndex, 1);
      /* Removes the product from the cart using the splice method */
    }
  }

  function cartTotal() {
    /* Iterates through the cart to get the total of all products */
    let total = 0;
    for (let product of cart) {
      total += product.price * product.quantity;
      /* Calculates the total price of each product by multiplying the price with the quantity */
    }
    /* Returns the sum of the products in the cart */
    return total;
  }

  function emptyCart() {
    /* Empties the products from the cart */
    cart.length = 0;
  }

  let totalPaid = 0;

  function pay(amount) {
    const total = cartTotal();
    const remainingBalance = total - totalPaid;
  
    if (amount < remainingBalance) {
      /* If the payment is less than the remaining balance */
      totalPaid += amount; 
      /* Updates the total amount paid */
      return -1 * (remainingBalance - amount);
      /* Returns the negative remaining balance */
    } else if (amount > remainingBalance) {
      /* If the payment is more than the remaining balance */
      totalPaid = total; 
      /* Updates the total amount paid to the total amount */
      return amount - remainingBalance;
      /* Returns the positive amount to be returned to the customer */
    } else {
      /* If the payment covers the total amount */
      totalPaid = total; 
      /* Updates the total amount paid to the total amount */
      return 0;
      /* Returns 0 as there is no remaining balance or amount to be returned */
    } 
  }

  module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay, 
    emptyCart,
  }