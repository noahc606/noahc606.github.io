window.addEventListener("resize", function(event) {
    updateSocialImagesSize();
})

function updateSocialImagesSize()
{
    console.log("Got window size change...");

    let cw = document.body.clientWidth;
    let ch = document.body.clientHeight;

    let socialImgs = document.getElementsByClassName("social-icon");
    let root = "/nch/assets/images/socials/";
    for(let i = 0; i<socialImgs.length; i++) {
        let id = "unknown";
        switch(i) {
            case 0: { id = "linkedin"; } break;
            case 1: { id = "github"; } break;
            case 2: { id = "uncc_email"; } break;
        }

        

        if(cw<825) {
            socialImgs[i].src = root+id+"_tiny.png";
            socialImgs[i].width = "32";

        } else {
            socialImgs[i].src = root+id+".png";
            socialImgs[i].width = "128";
        }
    }
    
    
    
}