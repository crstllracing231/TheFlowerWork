document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector('.cart-list');
    const upsellContainer = document.querySelector('.cout-upsell-list');

    const upsellOptions = [
        {
            id: 101,
            name: 'Personalized Greeting Card',
            desc: 'Add a heartfelt message',
            price: 150.00
        },
        {
            id: 102,
            name: 'Premium Gift Wrapping',
            desc: 'Elegant packaging upgrade',
            price: 250.00
        },
        {
            id: 103,
            name: 'Chocolate Box',
            desc: 'Assorted premium chocolates',
            price: 1000.00
        }
    ];

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
        cartContainer.innerHTML = '';

        const mainItems = cart.filter(item => item.id < 100);

        if (mainItems.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart f-bold">Your cart is empty.</p>'; //bold and big ass text maybe
        } else {
            mainItems.forEach((item, index) => {
                const totalItemPrice = (item.price * item.quantity).toLocaleString('en-US');
                const cardHTML = `
            <div class="cart-card selected" onclick="toggleSelection(this)">
                <div class="checkbox-container">
                    <div class="cust-checkbox"></div>
                </div>
                <div class="card-content">
                    <div class="cart-item-left">
                        <img src="${item.imagePath}" alt="${item.name}">
                        <div class="item-details-container">
                            <h3 class="f-bold">${item.name}</h3>
                            <div class="item-details">
                                <div class="quantity">
                                    <button class="qty-btn f-bold" onClick="updateQty(${item.id}, -1, event)">-</button>
                                    <span class="qty-value f-bold">${item.quantity}</span>
                                    <button class="qty-btn f-bold" onClick="updateQty(${item.id}, 1, event)">+</button>
                                </div>
                                <button class="delete-btn" onClick="deleteItem(${item.id}, event)">
                                    <img src="images/icons/bin.png" alt="Delete Icon">
                                    <img src="images/icons/bin_red.png" alt="Delete Icon Hover" class="hover-icon">                
                                </button>
                            </div>
                        </div>
                    </div>
                    <h3 class="price f-bold">₱ ${totalItemPrice}</h3>
                </div>
            </div>
            `;
                cartContainer.innerHTML += cardHTML;
            });
        }
        loadUpsells(cart);
    }

    function loadUpsells(currCart) {
        if (!upsellContainer) return;
        upsellContainer.innerHTML = '';

        upsellOptions.forEach(item => {
           const cartItem = currCart.find(c => c.id === item.id);
           const isSelected = !!cartItem;
           const quantity = cartItem ? cartItem.quantity : 1;
           const cardClass = isSelected ? 'cout-upsell-card selected' : 'cout-upsell-card';

            const html = `
            <article class="${cardClass}" onclick="toggleUpsell(${item.id})">
                <div class="checkbox-container">
                    <div class="cust-checkbox"></div>
                </div>
                <div class="cout-upsell-card-content">
                    <div class="upsell-item-left">
                        <div class="upsell-labels">
                            <h3 class="f-bold">${item.name}</h3>
                            <h4 class="f-medium">${item.desc}</h4>
                        </div>
                        <div class="upsell-controls" onclick="event.stopPropagation()">
                            <div class="upsell-quantity">
                                <button class="upsell-qty-btn f-bold" onClick="updateQty(${item.id}, -1, event)">-</button>
                                <span class="upsell-qty-value f-bold">${quantity}</span>
                                <button class="upsell-qty-btn f-bold" onClick="updateQty(${item.id}, 1, event)">+</button>
                            </div>
                            <button class="upsell-delete-btn" onClick="deleteItem(${item.id}, event)">
                                <img src="images/icons/bin.png" alt="Delete Icon">
                                <img src="images/icons/bin-red.png" alt="Delete Icon" class="hover-icon">
                            </button>
                        </div>
                    </div>
                    <h3 class="upsell-price f-bold">₱ ${(item.price * quantity).toLocaleString('en-US')}</h3>
                </div>
            </article>
            `;
            upsellContainer.innerHTML += html;
        });
    }

    window.toggleSelection = function(card) {
        card.classList.toggle('selected');
    };

    window.toggleUpsell = function(id) {
        let cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
        const index = cart.findIndex(item => item.id === id);

        if (index > -1) {
            cart.splice(index, 1);
        } else {
            const product = upsellOptions.find(u => u.id === id);
            cart.push({...product, quantity: 1});
        }

        localStorage.setItem('flowerCart', JSON.stringify(cart));
        loadCart();
    }

    window.updateQty = function(id, change, event) {
        event.stopPropagation();
        let cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
        const index = cart.findIndex(item => item.id === id);

        if (index === -1 && change > 0) {
            const product = upsellOptions.find(u => u.id === id);
            cart.push({...product, quantity: 1});
            localStorage.setItem('flowerCart', JSON.stringify(cart));
            loadCart();
            return;
        }
        if (index === -1) return;

        cart[index].quantity += change;

        if (cart[index].quantity < 1) {
            if (id < 100) cart.splice(index, 1);
            else cart[index].quantity = 1;
        }

        localStorage.setItem('flowerCart', JSON.stringify(cart));
        loadCart();
    }

    window.deleteItem = function(id, event) {
        event.stopPropagation();
        if (id > 100 || confirm('Are you sure you want to remove this item from your cart?')) {
            let cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
            const newCart = cart.filter(item => item.id !== id);
            localStorage.setItem('flowerCart', JSON.stringify(cart));
            loadCart();
        }
    }
    loadCart();
});

