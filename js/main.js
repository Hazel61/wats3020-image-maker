/* WATS 3020 Image Maker Code */

//This meme making program takes an image and adds text to it, and also makes it available for download.
// Define a base class that takes an image and adds text to it.
class ImageMaker {
    constructor(){
        this.imagePreview = document.querySelector("#image-preview");
        this.topText = document.createElement('p');
        this.topText.setAttribute('class', 'top-text');
        this.imagePreview.appendChild(this.topText);
        this.bottomText = document.createElement("p");
        this.bottomText.setAttribute('class', 'bottom-text');
        this.imagePreview.appendChild(this.bottomText);

        // Sets up form fields to read user input.
        this.backgroundInput = document.forms[0].querySelector('select[name = "backgroundImage"]');
        this.topTextInput = document.forms[0].querySelector('input[name = "topText"');
        this.bottomTextInput = document.forms[0].querySelector('input[name = "bottomText"');
    }
    // update innerHTML of image and text display
    drawPreview(){
        this.imagePreview.style.backgroundImage =`url("images/${this.backgroundInput.value}")`;
        this.topText.innerHTML = this.topTextInput.value;
        this.bottomText.innerHTML = this.bottomTextInput.value;
    }
    // Call to create new image and download with new data
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}
let imageMaker = new ImageMaker();
// Create the image and download. Takes parameters for image location and image size.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}
// Create event listeners for each form field added to the image maker
// form as well as the submit button that generates an image for download.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}
// Apply event listeners on page load.
applyEventListeners();
