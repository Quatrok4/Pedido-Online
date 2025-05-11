            let cart = [];

        function addToCart(item, price) {
            cart.push({ item, price });
            updateCartSummary();
        }

        function updateCartSummary() {
            if (cart.length === 0) {
                document.getElementById('cart-summary').innerText = 'Carrinho vazio';
            } else {
                const total = cart.reduce((sum, product) => sum + product.price, 0);
                const items = cart.map(product => product.item).join(', ');
                document.getElementById('cart-summary').innerText = `Itens: ${items} | Total: R$ ${total.toFixed(2)}`;
            }
        }

        function openCheckout() {
            document.getElementById('checkout-modal').style.display = 'flex';
        }
        function closeCheckout() {
            document.getElementById('checkout-modal').style.display = 'none';
        }

        function sendOrder() {
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const paymentMethod = document.getElementById('payment-method').value;

            if (!name || !address) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            const total = cart.reduce((sum, product) => sum + product.price, 0);
            const items = cart.map(product => product.item).join(', ');

            const message = `Olá, gostaria de fazer um pedido:\n\nItens: ${items}\nTotal: R$ ${total.toFixed(2)}\n\nNome: ${name}\nEndereço: ${address}\nForma de Pagamento: ${paymentMethod}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=552197299999998&text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        }

        function removeFromCart(item) {
            const index = cart.findIndex(product => product.item === item);
            if (index !== -1) {
            cart.splice(index, 1);
            updateCartSummary();
            }
        }

        function renderCartItems() {
            const cartSummary = document.getElementById('cart-summary');
            if (cart.length === 0) {
            cartSummary.innerHTML = 'Carrinho vazio';
            } else {
            const total = cart.reduce((sum, product) => sum + product.price, 0);
            const itemsHtml = cart.map(product => `
                <div>
                ${product.item} - R$ ${product.price.toFixed(2)}
                <button onclick="removeFromCart('${product.item}')">Remover</button>
                </div>
            `).join('');
            cartSummary.innerHTML = `
                <div>${itemsHtml}</div>
                <div>Total: R$ ${total.toFixed(2)}</div>
            `;
            }
        }

        function updateCartSummary() {
            renderCartItems();
        }