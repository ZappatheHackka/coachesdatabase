var editButton = document.querySelector(".edit-box");
var cancelForm = document.querySelector("#cancelBtn");
var addCoachBtn = document.querySelector('#addCoach');
var cancelCoachBtn = document.querySelector('#cancel-btn');

var form = document.querySelector("#popupform");
var coachForm = document.querySelector('#assignCoachPopup');

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