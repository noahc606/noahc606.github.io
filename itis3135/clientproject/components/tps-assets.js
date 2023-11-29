class TPS_Assets extends HTMLElement {
    constructor() {
        super();
    }  

    connectedCallback() {
        var head = document.getElementsByTagName('head')[0];
        head.outerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Technical Portfolio Studio | Index</title>
        <script src="components/tps-base.js" defer></script>
        <link rel="stylesheet" href="styles/tps-ui.css">
        <link rel="stylesheet" href="styles/default.css">
        <script src="components/builder.js"></script>
        <script src="scripts/utils.js"></script>
        <script src="scripts/btns.js"></script>
        <script src="scripts/main.js"></script>
        `;
    }
}

customElements.define('tps-assets', TPS_Assets);
