const fileNames = [
    "jumping-1.png",
    "jumping-2.png",
    "jumping-3.png",
    "jumping-4.png",
    "jumping-5.png"
];


function selectImage() {
    var randomIndex = Math.floor(Math.random() * fileNames.length);

    var filepath = `images/clip_art/${fileNames[randomIndex]}`;

    var img = document.querySelector(".prof-div-img");

    img.src = filepath;
}

window.onload = selectImage()