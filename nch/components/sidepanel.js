class NCH_SidePanel extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        this.innerHTML = `
        <div class="sidepanel">
            <a onclick="spBtnClick()" onmouseover="spBtnHover()" onmouseleave="spBtnLeave()" class="sidepanel-toggle">
                <img id="sidepanel-btn-img" src="images/sidebar-btn-light.png" alt="Sidepanel Toggle Button">
            </a>
            
            <div class="sidepanel-navbar-holder" hidden id="sidepanel-navbar-holder">
                <div class="sidepanel-navbar">
                    <div class="sidepanel-top">
                        <a class="no-underline" href="/nch/index.html"><h2>Noah's Web-Space</h2></a>
                    </div>
                    <nav>
                        <div><a class="no-underline" href="/nch/index.html">Home</a></div>
                        <!-- <a href="index.html">Out of This World Software</a> -->
                        <div><a class="no-underline" href="/itis3135/hobby/index.html">SDL2 Programming</a></div>
                        <div><a class="no-underline" href="https://github.com/SledgeThatJackal/SkyGazer/tree/main">SkyGazer (team effort)</a></div>
                        <!-- <a href="index.html">School/Old/Misc. projects</a> -->
                        <div><a class="no-underline random-link" href="#" onclick="spLinkRandomPage()">Random page</a></div>
                        <!-- <a href="index.html">Cookie settings</a> -->
                    </nav>
                    <p hidden>This is a test.</p>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('nch-sidepanel', NCH_SidePanel);