const template = document.createElement("template");
template.innerHTML = `
<style>
    .investor-card {
        background: var(--investor-card-background-color, #f4f4f4);
        font-family: 'Source Code Pro', monospace;
        width: 450px;
        display: grid;
        grid-template-columns: 40% auto;
    }

    .investor-card img {
        width: 100%;
    }

    .investor-card button {
        cursor: pointer;
        background: darkorchid;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
    }
</style>
<div class="investor-card">
    <img />
    <div>
        <h3></h3>
        <div class="info">
            <p><slot name="email"/></p>
            <p><slot name="phone"/></p>
        </div>
        <button id="toggle-details">Hide Info</button>
    </div>
</div>
`;

class InvestorCard extends HTMLElement {
    constructor() {
        super();
        this.showDetails = true; 
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
        this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
    }

    show(info,button) {
        info.style.display = 'block';
        button.innerText = 'Hide Details';
    }

    hide(info,button) {
        info.style.display = 'none';
        button.innerText = 'Show Details';
    }

    toggleInfo(){
        this.showDetails = !this.showDetails;
        const info = this.shadowRoot.querySelector('.info');
        const button = this.shadowRoot.querySelector('#toggle-details');
        this.showDetails ? this.show(info,button) : this.hide(info,button);
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#toggle-details").
            addEventListener('click', () => { 
                this.toggleInfo();
            });
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#toggle-details").
            removeEventListener();
    }

}

customElements.define("investor-card", InvestorCard);
