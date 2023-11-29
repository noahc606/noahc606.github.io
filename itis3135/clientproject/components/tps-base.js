class TPS_Base extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.outerHTML = `
        <header id="body-header"></header>
        <main id="body-main">
        </main>
        <footer id="body-footer"></footer>
        `;
    }
}

customElements.define('tps-base', TPS_Base);