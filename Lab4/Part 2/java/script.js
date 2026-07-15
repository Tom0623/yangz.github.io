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
