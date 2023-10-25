class NCH_Header extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <div class="div-background">
            <div class="div-header div-floating">
                <div class="div-subheader div-floating text-center">
                    <h1>Noah Hebert's ITIS3135 Site</h1>
                </div>
                <div class="div-subheader div-floating">
                    <nav>
                        <a href="index.html">Home</a> |
                        <a href="introduction.html">Introduction</a> |
                        <a href="contract.html">Contract</a> |
                        <a href="tables.html">Tables</a> |
                        <a href="forms.html">Forms</a> |
                        <a href="website_evaluations.html">Website Evaluations</a> |
                        <a href="firstscripts.html">First JavaScripts</a> |
                        <a href="byo_intro.html">BYO Intro</a> |
                        <a href="emmet.html">Emmet</a> |
                        <a href="project_1.html">Project 1</a> |
                        <a href="calculator_try.html">Calculator 1</a>
                    </nav>
                    <nav>
                        <a href="stuff/( ͡❛ ͜ʖ ͡❛) A WEBPAGE file!.htm">Bad Design</a>
                    </nav>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('nch-header', NCH_Header);