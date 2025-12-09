let bqs = [];
let productContainer;
let sortDisplay;
let sortTextDisplay;
let sortDropdownList;
let sortDropdownContainer;
let searchForm;

function renderBqs(data) {
    if (!productContainer) return;
    productContainer.innerHTML = '';

    data.forEach(bq => {
        const cardHTML = `
            <div class="prod-card" data-id="${bq.id}">
                <img src="${bq.imagePath}" alt="${bq.name}">
                <div class="card-text">
                    <h3 class="f-bold">${bq.name}</h3>
                    <h3 class="f-bold">₱ ${bq.price.toLocaleString('en-US')}</h3>
                    <button class="lason-btn f-quicksand f-bold" data-id="${bq.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.innerHTML += cardHTML;
    });

    document.querySelectorAll('.lason-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id= parseInt(e.target.dataset.id);
            const product = bqs.find(item => item.id === id);
            addToCart(product);
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('flowerCart')) || [];
    const existsInCart = cart.find(item => item.id === product.id);

    if (existsInCart) {
        existsInCart.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('flowerCart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
}

function sortBqs(sortValue) {
    let sortedData = [...bqs];

    switch (sortValue) {
        case 'alphabetical_asc': sortedData.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'alphabetical_desc': sortedData.sort((a, b) => b.name.localeCompare(a.name)); break;
        case 'price_asc': sortedData.sort((a, b) => a.price - b.price); break;
        case 'price_desc': sortedData.sort((a, b) => b.price - a.price); break;
        default: sortedData.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    renderBqs(sortedData);
}

function searchBqs(query) {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
        sortBqs(sortDisplay.dataset.currentSort || 'alphabetical_asc');
        return;
    }

    const filteredData = bqs.filter(bq =>
        bq.name.toLowerCase().includes(searchTerm)
    );

    renderBqs(filteredData);
}

function initListeners() {
    sortDisplay.addEventListener('click', () => {
        sortDropdownList.classList.toggle('show');
        sortDropdownContainer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if(!sortDropdownContainer.contains(e.target)) {
            sortDropdownList.classList.remove('show');
            sortDropdownContainer.classList.remove('open');
        }
    });

    sortDropdownList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedSort = e.target;
            const sortValue = selectedSort.dataset.sortValue;
            const sortText = selectedSort.textContent;

            sortBqs(sortValue);

            if (sortTextDisplay) sortTextDisplay.textContent = `Sort by: ${sortText}`;

            sortDisplay.dataset.currentSort = sortValue;

            sortDropdownList.classList.remove('show');
            sortDropdownContainer.classList.remove('open');

            sortDropdownList.querySelectorAll('li').forEach(li => li.classList.remove('active-sort'));
            selectedSort.classList.add('active-sort');
        }
    });

    searchForm.addEventListener('submit', (e) => {
       e.preventDefault();

       const searchInput = searchForm.querySelector('.search-field');
       searchBqs(searchInput.value);
    });
}

async function initBqsPg() {
    productContainer = document.getElementById('bq-grid-container');
    sortDropdownContainer = document.getElementById('sort-dropdown');
    sortDisplay = document.querySelector('.sort-display');
    sortTextDisplay = document.getElementById('sort-text-display');
    sortDropdownList = document.querySelector('.sort-dropdown-list');
    searchForm = document.querySelector('.search-bar');

    try {
        const response = await fetch('bouquets.json');
        if (!response.ok) throw new Error('Network response was not ok.');
        bqs = await response.json();
        initListeners();

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search');

        if (query) {
            searchBqs(query);
            if (searchForm) searchForm.querySelector('.search-field').value = query;
        } else {
            sortBqs('alphabetical_asc');
        }

    } catch (e) {
        console.error(e);
    }
}

document.addEventListener('DOMContentLoaded', initBqsPg);