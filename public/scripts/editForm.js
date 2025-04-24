var editButton = document.querySelector(".edit-box");
var cancelForm = document.querySelector("#cancelBtn");
var addCoachBtn = document.querySelector('#addCoach');
var cancelCoachBtn = document.querySelector('#cancel-btn');
var addRatingBtn = document.querySelector('#addRatingBtn');



var form = document.querySelector("#popupform");
var coachForm = document.querySelector('#assignCoachPopup');
var ratingForm = document.querySelector('#rating-popup');

editButton.addEventListener("click", () => {
    form.style.display="block";
});

cancelForm.addEventListener("click", () => {
    form.style.display="none";
});

addCoachBtn.addEventListener("click", () => {
    coachForm.style.display="block";
});

cancelCoachBtn.addEventListener("click", () => {
    coachForm.style.display="none";
});

addRatingBtn.addEventListener("click", () => {
    ratingForm.style.display="block";
})