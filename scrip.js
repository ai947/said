// Data for the cart
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load from localStorage or initialize empty
let total = 0;

// Function to add product to cart
function addToCart(productName, productPrice, productImage) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        const item = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    renderCart();
}

// Function to render the cart
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    total = 0; // Reset total
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <div class="quantity-controls">
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <span>${item.price * item.quantity}$</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">إزالة</button>
            </div>
        `;
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total').innerText = total + '$';
}

// Function to update quantity
function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        renderCart();
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    renderCart();
}

// Add click event listeners to add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h5').innerText;
        const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('السعر: ', '').replace('$', ''));
        const productImage = productCard.querySelector('img').src;
        addToCart(productName, productPrice, productImage);
    });
});

// Function to confirm order and redirect to checkout page
function confirmOrder() {
    window.location.href = 'checkout.html'; // Redirect to checkout page
}

// Initialize cart on page load
renderCart();