// refactor for repetition

var editButton = document.querySelector(".edit-box");
var cancelForm = document.querySelector("#cancelEdit");

var addCoachBtn = document.querySelector('#addCoach');
var cancelCoachBtn = document.querySelector('#cancel-btn');

var addRatingBtn = document.querySelector('#addRatingBtn');
var cancelRating = document.querySelector('#cancelBtn');
var deleteRatings = document.querySelectorAll('.deleteRatingBtn');



var form = document.querySelector("#popupform");
var coachForm = document.querySelector('#assignCoachPopup');
var ratingForm = document.querySelector('#rating-popup');
var areUSure = document.querySelectorAll('.confirmDeleteRating');
var cancelDelete = document.querySelectorAll('.cancelDelete');

editButton.addEventListener("click", () => {
    form.style.display="block";
});

cancelForm.addEventListener("click", () => {
    form.style.display="none";
    console.log('hi');
});


addCoachBtn.addEventListener("click", () => {
    coachForm.style.display="block";
});

cancelCoachBtn.addEventListener("click", () => {
    coachForm.style.display="none";
});


addRatingBtn.addEventListener("click", () => {
    ratingForm.style.display="block";
});

cancelRating.addEventListener("click", () => {
    console.log("hello");
    ratingForm.style.display="none";
});

deleteRatings.forEach(button => {
    button.addEventListener("click", function() {
    const rating = this.closest(".rating");
    const ratingForm = rating.nextElementSibling;
    ratingForm.style.display="block";
    });
});

cancelDelete.forEach(button => {
    button.addEventListener('click', function() {
        const ratingForm = this.closest(".confirmDeleteRating");
        ratingForm.style.display = "none";
    });
});

