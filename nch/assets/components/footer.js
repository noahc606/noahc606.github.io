let siteVersion = "1.1.3";
let lastUpdate = "12:33pm, 2 October 2024";

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
                <p>© 2024 Designed by Noah Hebert @ <a href="/nch/ootws/">Out of this World Software</a>.</p>
                <p>Site version: <b>`+siteVersion+`</b> (`+lastUpdate+`).</p>
            </div>
        </div>
        `;
    }
}

customElements.define('nch-footer', NCH_Footer);