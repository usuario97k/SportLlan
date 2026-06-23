// carrito-page.js

document.addEventListener('DOMContentLoaded', () => {
    // Botones y elementos del checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const modalClose = document.getElementById('modalClose');
    const checkoutForm = document.getElementById('checkoutForm');
    const orderSuccess = document.getElementById('orderSuccess');
    const orderNumberEl = document.getElementById('orderNumber');

    // Mostrar modal
    if (checkoutBtn && checkoutModal) {
        checkoutBtn.addEventListener('click', () => {
            checkoutModal.classList.add('active');
        });
    }

    // Cerrar modal
    if (modalClose && checkoutModal && checkoutForm && orderSuccess) {
        modalClose.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
            checkoutForm.style.display = 'block';
            orderSuccess.classList.remove('active');
        });
    }

    // Envío (shipping)
    setupShippingOptions();

    // Envío del formulario de checkout
    if (checkoutForm && orderSuccess && orderNumberEl) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const orderNumber = generateOrderNumber();
            orderNumberEl.textContent = orderNumber;

            checkoutForm.style.display = 'none';
            orderSuccess.active = true;
            orderSuccess.classList.add('active');

            // Vaciar carrito
            cart = [];
            saveCart();
            updateCartCount();
            renderCartItems();

            setTimeout(() => {
                checkoutModal.classList.remove('active');
                window.location.href = 'index.html';
            }, 3000);
        });
    }
});


// Generar número de orden
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `SL-${timestamp}-${random}`;
}


// Opciones de envío
function setupShippingOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const shippingLabel = document.getElementById('shippingLabel');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    if (!shippingOptions || !subtotalEl || !totalEl || !shippingLabel) return;

    const recalcTotal = () => {
        const selected = document.querySelector('input[name="shipping"]:checked');
        const shipping = selected && selected.value === 'region' ? 12000 : 5000;
        const labelText = selected && selected.value === 'region'
            ? 'Regiones ($12.000)'
            : 'Santiago ($5.000)';

        shippingLabel.textContent = labelText;

        const subtotal = cart.reduce((sum, item) => sum + (item.priceWithIVA * item.quantity), 0);
        const total = subtotal + shipping;

        subtotalEl.textContent = `$${subtotal.toLocaleString('es-CL')}`;
        totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
    };

    shippingOptions.forEach(option => {
        option.addEventListener('change', recalcTotal);
    });

    // Calcular una vez al entrar a la página
    recalcTotal();
}