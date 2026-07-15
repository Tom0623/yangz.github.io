const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// Make an array for the images and add all image to this.
const images = [{filename: "images/pic1.jpg" , alt: "Closeup of a human eye"},
    {filename: "images/pic2.jpg" , alt: "Rock that looks like a wave"},
    {filename: "images/pic3.jpg" , alt: "Purple and white pansies"},
    {filename: "images/pic4.jpg" , alt: "Section of wall from a pharaoh's tomb"},
    {filename: "images/pic5.jpg" , alt: "Large moth on a leaf"}];

// Add the images to the thumbnail bar
// Create a constant called baseURL containing the base URL of each image file
const baseURL = "https://github.com/Tom0623/yangz.github.io/tree/main/Lab4/Part%202/images";

// make a for loop
for (const image of images) {
    //For each image, create a new <img> element.
    const newImg = document.createElement("img");
    // Set the <img> source to equal the URL of the image, which should be a combination of the baseURL and the filename, and the alt attribute equal to the alt text.
    newImg.src = `${baseURL}${image.filename}`;
    newImg.alt = image.alt;
    //Add another attribute to the <img> to make it focusable via the keyword.
    newImage.tabIndex = 0;
    //Append the <img> to the thumbBar.
    thumbBar.appendChild(newImage);
    // Add a click event handler to the <img> so that when it is clicked, a function called updateDisplayedImage() is run, which displays the clicked image at full size. You'll create this function later on.
    newImage.addEventListener('click', updateDisplayedImage);
}

//  Create the updateDisplayedImage() function
function updateDisplayedImage(event) {
    displayedImage.src = event.target.src;
    displayedImage.alt = event.target.alt;
}

//Wire up the Darken/Lighten button
//Add a click event handler to the <button> with an anonymous function set as the handler function.
btn.addEventListener("click", function() {
   // Inside the function body, add a conditional structure that tests whether the <button> has a class set on it of dark or not.
    if (btn.classList.contains("dark")) {
        //If the <button> has a class of dark when clicked, change its text content to Lighten, and change the overlay element's background color to rgb(0 0 0 / 0.5). Remove the <button> element's dark class.
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0.5)";
    }else{
        //If the <button> does not have a class of dark when clicked, change its text content to Darken, and change the overlay element's background color to rgb(0 0 0 / 0). Add the <button> element's dark class.
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0)";
    }
})
