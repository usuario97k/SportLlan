// script.js


// IVA 19%
const IVA_RATE = 0.19;


// Productos de ejemplo
const products = [
    {
        id: 1,
        name: "Guantes Pro Elite 16oz",
        category: "guantes",
        oldPrice: 109990,
        price: 89990,
        description: "Guantes profesionales de boxeo con protección premium. Ideal para sparring y competencia. Material sintético resistente con acolchado de foam multidensidad.",
        icon: "🥊",
        image: "imagenes/producto1.jpg",
        isFeatured: true
    },
    {
        id: 2,
        name: "Guantes Recreation Star 12oz",
        category: "guantes",
        oldPrice: 74990,
        price: 54990,
        description: "Guantes para entrenamiento recreativo. Perfectos para principiantes. Ventilación superior y cierre de velcro ajustable.",
        icon: "🥊",
        image: "imagenes/producto2.jpg",
        isFeatured: true
    },
    {
        id: 3,
        name: "Saco Profesional 100kg",
        category: "sacos",
        oldPrice: 229990,
        price: 189990,
        description: "Saco profesional de 120cm con 100kg de peso. Material PVC resistente. Incluye cadena de soporte y chupones para fijación.",
        icon: "🎯",
        image: "imagenes/producto3.jpg",
        isFeatured: true
    },
    {
        id: 4,
        name: "Saco Básico 60kg",
        category: "sacos",
        oldPrice: 119990,
        price: 99990,
        description: "Saco básico de 90cm con 60kg. Ideal para entrenamiento en casa. Material resistente y duradero.",
        icon: "🎯",
        image: "imagenes/producto4.jpg",
        isFeatured: false
    },
    {
        id: 5,
        name: "Casco Competencia",
        category: "protecciones",
        oldPrice: 79990,
        price: 64990,
        description: "Casco oficial para competencia. Protección completa con visera ajustable. Tamaño regulable con velcro.",
        icon: "🛡️",
        image: "imagenes/producto5.jpg",
        isFeatured: false
    },
    {
        id: 6,
        name: "Set Canilleras + Coderas",
        category: "protecciones",
        oldPrice: 49990,
        price: 39990,
        description: "Set completo de protección para piernas y brazos. Material ergonómico con ventilación. Cierre ajustable.",
        icon: "🛡️",
        image: "imagenes/producto6.jpg",
        isFeatured: false
    },
    {
        id: 7,
        name: "Fubandas Pro 4.5m",
        category: "accesorios",
        oldPrice: 24990,
        price: 19990,
        description: "Fubandas profesionales de 4.5 metros. Material elástico con protección para nudillos. Cierre de velcro.",
        icon: "🧤",
        image: "imagenes/producto7.jpg",
        isFeatured: false
    },
    {
        id: 8,
        name: "Bolsa para Guantes",
        category: "accesorios",
        oldPrice: 35990,
        price: 29990,
        description: "Bolsa resistente para transporte de guantes y equipamiento. Ventilación superior. Compartimento adicional.",
        icon: "🧤",
        image: "imagenes/producto8.jpg",
        isFeatured: false
    },


    // ---- NUEVOS 4 PRODUCTOS ----
    {
        id: 9,
        name: "Cuerda de Metal Profesional",
        category: "guantes",
        oldPrice: 89990,
        price: 72990,
        description: "Cuerda de saltar de metal profesional de 280cm con mango ergonómico. Material acero resistente y cable giratorio.",
        icon: "🥊",
        image: "imagenes/producto9.jpg",
        isFeatured: true
    },
    {
        id: 10,
        name: "Kit Mochila, Bebedor y Toalla Profesional",
        category: "sacos",
        oldPrice: 99990,
        price: 79990,
        description: "Kit completo con mochila ergonómica, bebedor de 750ml y toalla rápida de secado",
        icon: "🎯",
        image: "imagenes/producto10.jpg",
        isFeatured: false
    },
    {
        id: 11,
        name: "Kit 3 Bucales de Boxeo Profesional",
        category: "protecciones",
        oldPrice: 89990,
        price: 74990,
        description: "bucales de boxeo profesional de silicona médica. Protección superior para dientes y labios.",
        icon: "🛡️",
        image: "imagenes/producto11.jpg",
        isFeatured: false
    },
    {
        id: 12,
        name: "Colchón de Impacto de Mano Profesional",
        category: "accesorios",
        oldPrice: 59990,
        price: 47990,
        description: "40x40cm con espuma de alta densidad. Material PVC resistente. Ideal para entrenamiento de precisión y técnica en boxeo.",
        icon: "⏱️",
        image: "imagenes/producto12.jpg",
        isFeatured: true
    }
];


// Calcular precio con IVA para todos
products.forEach(p => {
    p.priceWithIVA = Math.round(p.price * (1 + IVA_RATE));
});


// Carrito de compras
let cart = [];


// Cargar carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('sportllan_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        renderCartItems();
    }
}


// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('sportllan_cart', JSON.stringify(cart));
}


// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}


// Añadir producto al carrito
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
   
    const existingItem = cart.find(item => item.id === productId);
   
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            priceWithIVA: product.priceWithIVA,
            oldPrice: product.oldPrice,
            description: product.description,
            icon: product.icon,
            image: product.image,
            quantity: quantity
        });
    }
   
    saveCart();
    updateCartCount();
   
    showNotification('✅ Producto añadido al carrito!');
}


// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
   
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Renderizar items del carrito
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
   
    if (!cartItems || !cartEmpty || !cartSummary) return;
   
    // CARRITO VACÍO
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartItems.style.display = 'none';


        cartEmpty.classList.add('active');


        cartSummary.style.display = 'block';


        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');
        const shippingLabel = document.getElementById('shippingLabel');


        if (subtotalEl) subtotalEl.textContent = '$0';
        if (totalEl) totalEl.textContent = '$0';
        if (shippingLabel) shippingLabel.textContent = 'Santiago ($5.000)';


        return;
    }


    // CARRITO CON PRODUCTOS
    cartEmpty.classList.remove('active');
    cartItems.style.display = 'flex';
    cartSummary.style.display = 'block';
   
    cartItems.innerHTML = '';
   
    cart.forEach(item => {
        const itemTotal = item.priceWithIVA * item.quantity;
       
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                ${item.image
                    ? `<img src="${item.image}" alt="${item.name}">`
                    : item.icon}
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price-block">
                    <div class="item-old-price">$${item.oldPrice.toLocaleString('es-CL')}</div>
                    <div class="item-current-price">
                        $${item.priceWithIVA.toLocaleString('es-CL')}
                        <span class="iva-text">IVA incluido</span>
                    </div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" readonly>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="item-total">
                <div class="price">$${itemTotal.toLocaleString('es-CL')}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
       
        cartItems.appendChild(cartItem);
    });
   
    if (typeof setupShippingOptions === 'function') {
        setupShippingOptions();
    }
}


// Actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
   
    item.quantity += change;
   
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        renderCartItems();
    }
}


// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
    showNotification('🗑️ Producto eliminado del carrito');
}


// Actualizar resumen del carrito (NO usado, lo hace setupShippingOptions en carrito-page.js)
function updateCartSummary() {
    // vacío a propósito
}


// Renderizar productos destacados en index (solo 3, sin id 4)
function renderFeaturedProducts() {
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts) return;
   
    featuredProducts.innerHTML = '';
   
    const featured = products
        .filter(p => p.isFeatured === true && p.id !== 4)
        .slice(0, 3);
   
    featured.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-offer-badge">Oferta</div>
            <div class="product-image">
                ${product.image
                    ? `<img src="${product.image}" alt="${product.name}">`
                    : product.icon}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price-block">
                    <div class="product-old-price">$${product.oldPrice.toLocaleString('es-CL')}</div>
                    <div class="product-current-price">
                        $${product.priceWithIVA.toLocaleString('es-CL')}
                        <span class="iva-text">IVA incluido</span>
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, 1)">
                    🛒 Añadir al Carrito
                </button>
            </div>
        `;
       
        featuredProducts.appendChild(productCard);
    });
}


// Renderizar lista de productos en productos.html con orden
function renderAllProducts(sortMode = 'recommended') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;


    productsGrid.innerHTML = '';


    let sorted = [...products];


    if (sortMode === 'price-asc') {
        sorted.sort((a, b) => a.priceWithIVA - b.priceWithIVA);
    } else if (sortMode === 'price-desc') {
        sorted.sort((a, b) => b.priceWithIVA - a.priceWithIVA);
    } else {
        // recomendados: isFeatured primero
        sorted.sort((a, b) => {
            if (a.isFeatured === b.isFeatured) return 0;
            return a.isFeatured ? -1 : 1;
        });
    }


    sorted.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-offer-badge">Oferta</div>
            <div class="product-image">
                ${product.image
                    ? `<img src="${product.image}" alt="${product.name}">`
                    : product.icon}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price-block">
                    <div class="product-old-price">$${product.oldPrice.toLocaleString('es-CL')}</div>
                    <div class="product-current-price">
                        $${product.priceWithIVA.toLocaleString('es-CL')}
                        <span class="iva-text">IVA incluido</span>
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, 1)">
                    🛒 Añadir al Carrito
                </button>
            </div>
        `;


        productsGrid.appendChild(productCard);
    });
}


// Mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
   
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}


// Notificación CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #00d4ff;
        color: #000000;
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    }
   
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1);
        }
    }
`;
document.head.appendChild(notificationStyle);


// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderFeaturedProducts();  // index.html (si tiene #featuredProducts)
    renderAllProducts();       // productos.html (si tiene #productsGrid)
    setupMobileMenu();
});


// Ordenar productos en productos.html (selector)
document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;


    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value; // 'recommended' | 'price-asc' | 'price-desc'
        renderAllProducts(value);
    });
});


// HERO IMAGE SLIDER (index.html)
document.addEventListener('DOMContentLoaded', function () {
    const heroImg = document.getElementById('heroSlider');
    if (!heroImg) return;


    const heroImages = [
        'imagenes/banner.jpg',
        'imagenes/banner2.jpg',
        'imagenes/banner3.jpg'
    ];


    let currentIndex = 0;


    heroImg.src = heroImages[currentIndex];


    setInterval(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImg.src = heroImages[currentIndex];
    }, 5000); // 5 segundos
});