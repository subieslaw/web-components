class StockPrice extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  set price(price) {
    this.data = price;
    this.root.innerHTML = `
         <style>
          h2 {
            color: white;
            background-color: #666;
            padding: 5px;
          }
         </style>
        <h2>${price.ticker}</h2>
        <p>Close price: ${price.close}</p>
        <button id='register'>Register</button>
        `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#register").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("change", { detail: { ticker: this.data.ticker } })
      );
    });
  }
}

customElements.define("stock-price", StockPrice);
