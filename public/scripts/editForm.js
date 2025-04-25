// refactor for repetition

var editButton = document.querySelector(".edit-box");
var cancelForm = document.querySelector("#cancelEdit");

var addCoachBtn = document.querySelector('#addCoach');
var cancelCoachBtn = document.querySelector('#cancel-btn');

var addRatingBtn = document.querySelector('#addRatingBtn');
var cancelRating = document.querySelector('#cancelBtn');
var deleteRating = document.querySelector('#deleteRatingBtn');



var form = document.querySelector("#popupform");
var coachForm = document.querySelector('#assignCoachPopup');
var ratingForm = document.querySelector('#rating-popup');
var areUSure = document.querySelector('.delete-comment-form');


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
    ratingForm.style.display="none";
});

deleteRating.addEventListener("click", () => {
    areUSure.style.display="block";
})