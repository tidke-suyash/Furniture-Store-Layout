/**
 * FURNITURE STORE — UI Logic
 * ─────────────────────────────────────────────────────────────
 * CONFIG: Search for "CONFIG" comments to find all values you
 * need to change before going live.
 * ─────────────────────────────────────────────────────────────
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. NOTIFICATION / TOAST SYSTEM
    // =========================================================================
    const notifContainer = document.getElementById('notification-container');

    window.showNotification = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon"></span><span>${message}</span>`;
        notifContainer.appendChild(toast);

        const dismiss = () => {
            toast.classList.add('dismissing');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        };
        setTimeout(dismiss, 3500);
    };

    // =========================================================================
    // 2. SCROLL REVEAL
    // =========================================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // =========================================================================
    // 3. MATERIAL EXPLORER
    // CONFIG: Replace URLs with your own material images
    // =========================================================================
    const matBtns = document.querySelectorAll('.mat-btn');
    const matImg = document.getElementById('mat-preview-img');

    const materials = {
        marble: 'https://images.unsplash.com/photo-1629285483773-6b5cde2171d7?auto=format&fit=crop&q=80&w=1000',
        walnut: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1000',
        velvet: 'https://images.unsplash.com/photo-1584989632832-75d5e56e07f8?auto=format&fit=crop&q=80&w=1000'
    };

    matBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            matBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            matImg.style.opacity = '0.4';
            setTimeout(() => {
                matImg.src = materials[btn.dataset.type];
                matImg.style.opacity = '1';
            }, 200);
        });
    });

    // =========================================================================
    // 4. ROOM VISUALIZER
    // CONFIG: Replace URLs with your own room images
    // =========================================================================
    const visMood = document.getElementById('vis-mood');
    const visRoom = document.getElementById('vis-room');
    const visImg = document.getElementById('vis-image');

    const visualizerDB = {
        bright: {
            living: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
            dining: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=2000'
        },
        evening: {
            living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000',
            dining: 'https://images.unsplash.com/photo-1617806118233-18e1c48e3524?auto=format&fit=crop&q=80&w=2000'
        }
    };

    function updateVisualizer() {
        visImg.style.opacity = '0.4';
        setTimeout(() => {
            visImg.src = visualizerDB[visMood.value][visRoom.value];
            visImg.style.opacity = '1';
        }, 280);
    }

    visMood.addEventListener('change', updateVisualizer);
    visRoom.addEventListener('change', updateVisualizer);

    // =========================================================================
    // 5. CART LOGIC
    // CONFIG: Replace WA_NUMBER with your WhatsApp number (country code + number, no +)
    // =========================================================================
    let cart = JSON.parse(localStorage.getItem('furniture_cart')) || [];
    const WA_NUMBER = "91XXXXXXXXXX"; // CONFIG: e.g. "917620305001"

    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const cartItemsDiv = document.getElementById('cart-items');

    function openCart() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        renderCart();
    }

    function closeCart() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }

    document.getElementById('cart-toggle').addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.contains('open') ? closeCart() : openCart();
    });
    document.getElementById('close-cart').addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    function saveAndCount() {
        localStorage.setItem('furniture_cart', JSON.stringify(cart));
        document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
    }

    function renderCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p style="color:var(--text-muted); padding:1.5rem 0; font-size:0.95rem;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.qty;
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="btn-qty" data-action="dec" data-id="${item.id}">−</button>
                        <span>${item.qty}</span>
                        <button class="btn-qty" data-action="inc" data-id="${item.id}">+</button>
                        <button class="btn-remove" data-id="${item.id}">Remove</button>
                    </div>`;
                cartItemsDiv.appendChild(div);
            });
        }
        document.getElementById('cart-total-price').innerText = `₹${total.toLocaleString('en-IN')}`;
        saveAndCount();
    }

    cartItemsDiv.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-id]');
        if (!btn) return;
        const id = btn.dataset.id;

        if (btn.classList.contains('btn-qty')) {
            const item = cart.find(i => i.id === id);
            if (item) {
                if (btn.dataset.action === 'inc') {
                    item.qty += 1;
                    showNotification('Cart updated', 'info');
                } else {
                    item.qty -= 1;
                    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
                    showNotification('Cart updated', 'info');
                }
                renderCart();
            }
        }

        if (btn.classList.contains('btn-remove')) {
            const item = cart.find(i => i.id === id);
            const name = item ? item.name : 'Item';
            cart = cart.filter(i => i.id !== id);
            renderCart();
            showNotification(`${name} removed from cart`, 'info');
        }
    });

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { id, name, price } = e.target.dataset;
            const existing = cart.find(i => i.id === id);
            if (existing) {
                existing.qty += 1;
                showNotification(`${name} — quantity updated`, 'info');
            } else {
                cart.push({ id, name, price: parseInt(price), qty: 1 });
                showNotification(`${name} added to cart`, 'success');
            }
            saveAndCount();
        });
    });

    saveAndCount();

    // =========================================================================
    // 6. LOCATION BUTTON
    // =========================================================================
    const locBtn = document.getElementById('btn-location');
    const locStatus = document.getElementById('location-status');
    const gpsInput = document.getElementById('cust-gps');

    locBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showNotification('Location not supported on this browser', 'error');
            return;
        }

        locBtn.textContent = '📍 Getting location…';
        locBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            pos => {
                const { latitude: lat, longitude: lon } = pos.coords;
                gpsInput.value = `https://www.google.com/maps?q=${lat},${lon}`;
                locBtn.classList.add('location-set');
                locBtn.textContent = '✓ Location Added';
                locBtn.disabled = false;
                locStatus.textContent = 'Your location has been saved.';
                showNotification('Location captured successfully', 'success');
            },
            () => {
                locBtn.textContent = '📍 Add My Location';
                locBtn.disabled = false;
                locStatus.textContent = 'Permission denied. You can enter your address manually.';
                showNotification('Location access denied', 'error');
            }
        );
    });

    // =========================================================================
    // 7. CHECKOUT — WHATSAPP
    // CONFIG: Update the order message template below if needed
    // =========================================================================
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }

        const name    = document.getElementById('cust-name').value.trim();
        const phone   = document.getElementById('cust-phone').value.trim();
        const address = document.getElementById('cust-address').value.trim();
        const gps     = gpsInput.value;

        let grand = 0;
        let productLines = '';
        cart.forEach((item, idx) => {
            const lineTotal = item.price * item.qty;
            grand += lineTotal;
            productLines += `${idx + 1}. ${item.name} x${item.qty} — ₹${lineTotal.toLocaleString('en-IN')}\n`;
        });

        const msg =
`Furniture Inquiry

Customer Name: ${name}
Phone: ${phone}
Address: ${address}${gps ? `\nLocation (Google Maps): ${gps}` : ''}

Products:
${productLines}
Total: ₹${grand.toLocaleString('en-IN')}`;

        try {
            window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
            showNotification('Order sent via WhatsApp!', 'success');

            cart = [];
            saveAndCount();
            closeCart();

            locBtn.classList.remove('location-set');
            locBtn.textContent = '📍 Add My Location';
            gpsInput.value = '';
            locStatus.textContent = '';
            e.target.reset();
        } catch {
            showNotification('Could not open WhatsApp. Please try again.', 'error');
        }
    });

});
