let lastUpdate = "8:15am on 13 September 2024";

class NCH_Footer extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <div class="div-background">
            <div class="div-footer floating">
                <a href="https://validator.w3.org/nu/?doc=`+window.location.href+`" target="_blank" class="no-underline">
                    <img style="border:0;width:88px;height:31px" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png" alt="Valid HTML!">
                </a>
                <a href="https://jigsaw.w3.org/css-validator/validator?uri=`+window.location.href+`" target="_blank" class="no-underline">
                    <img style="border:0;width:88px;height:31px" src="https://jigsaw.w3.org/css-validator/images/vcss" alt="ValidCSS!">
                </a>
                <p>Site was last updated at `+lastUpdate+`.</p>
            </div>
        </div>
        `;
    }
}

customElements.define('nch-footer', NCH_Footer);