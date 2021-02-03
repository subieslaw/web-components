import './stock-price.js'
import './investor-card.js'

window.addEventListener('load', () => {
    fetchStockAssets();
});

async function fetchStockAssets() {
    const stockApiUrl = 'http://localhost:5500/data/cdpr.json';
    const res = await fetch(stockApiUrl);
    const json = await res.json();
    const main = document.querySelector('main');
    const el = document.createElement('stock-price');
    el.price = json;
    el.addEventListener('change', event => {
        const val = event.detail.ticker;
        console.log('Registered for: %s', val);
      });

    main.appendChild(el);


}