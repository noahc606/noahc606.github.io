class NCH_Footer extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <div class="div-background">
            <div class="div-footer div-floating">
                <nav>
                    <a href="https://webpages.charlotte.edu/nhebert1/">CLT Webspace</a> |
                    <a href="https://github.com/noahc606/noahc606.github.io">Course Github</a> |
                    <a href="https://noahc606.github.io/">Course Github.io</a> |
                    <a href="https://www.freecodecamp.org/noahc606">freeCodeCamp</a> |
                    <a href="https://www.codecademy.com/profiles/noahc606">Codecademy</a> |
                    <a href="https://www.linkedin.com/in/nh606/">LinkedIn</a>
                </nav>
                <p>
                    © 2023 Designed by 
                    <a href="hi.biz/">Hebert, Inc</a>.
                    Certified in
                    <a href="https://freecodecamp.org/certification/noahc606/responsive-web-design" target="_blank">Responsive Web Design</a>
                    and
                    <a href="https://www.freecodecamp.org/certification/noahc606/javascript-algorithms-and-data-structures" target="_blank">JavaScript</a>.
                </p>
                <a href="https://validator.w3.org/nu/?doc=`+window.location.href+`" target="_blank" class="no-underline">
                    <img style="border:0;width:88px;height:31px" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png" alt="Valid HTML!">
                </a>
                <a href="https://jigsaw.w3.org/css-validator/validator?uri=`+window.location.href+`" target="_blank" class="no-underline">
                    <img style="border:0;width:88px;height:31px" src="https://jigsaw.w3.org/css-validator/images/vcss" alt="ValidCSS!">
                </a>
            </div>
        </div>
        <div class="div-background-alt">
        </div>
        `;
    }
}

customElements.define('nch-footer', NCH_Footer);