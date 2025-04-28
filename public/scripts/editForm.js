// Gather all DOM elements at top
var form = document.querySelector("#popupform");
var coachForm = document.querySelector('#assignCoachPopup');
var ratingForm = document.querySelector('#rating-popup');
var commentForm = document.querySelector('#commentPopup');

var editButton = document.querySelector(".edit-box");
var cancelForm = document.querySelector("#cancelEdit");

var addCoachBtn = document.querySelector('#addCoach');
var cancelCoachBtn = document.querySelector('#cancel-btn');

var addRatingBtn = document.querySelector('#addRatingBtn');
var cancelRating = document.querySelector('#cancelBtn');
var deleteRatings = document.querySelectorAll('.deleteRatingBtn');
var ratingPencils = document.querySelectorAll('.ratingPencil');
var editRatings = document.querySelectorAll(".edit-rating-popup");

var cancelDelete = document.querySelectorAll('.cancelDelete');


var addCommentBtn = document.querySelector('#addCommentBtn');
var cancelComment = document.querySelector('#cancelComment');
var deleteCommentBtns = document.querySelectorAll('.deleteComments');
var editCommentBtns = document.querySelectorAll(".commentPencil");
var cancelComEdit = document.querySelectorAll('.cancelEditComment');

var cancelComDelete = document.querySelectorAll(".cancelComDelete");

// Event listeners

// Edit client PII
editButton.addEventListener("click", () => {
    form.style.display = "block";
});

cancelForm.addEventListener("click", () => {
    form.style.display = "none";
});

// Edit coaching associations
addCoachBtn.addEventListener("click", () => {
    coachForm.style.display = "block";
});

cancelCoachBtn.addEventListener("click", () => {
    coachForm.style.display = "none";
});

// Add client ratings
addRatingBtn.addEventListener("click", () => {
    ratingForm.style.display = "block";
});

cancelRating.addEventListener("click", () => {
    ratingForm.style.display = "none";
});

// Edit client ratings

ratingPencils.forEach(pencil => {
    pencil.addEventListener('click', function() {
        var rating = this.closest('.rating');
        var anotherForm = rating.nextElementSibling;
        var editForm = anotherForm.nextElementSibling;
        editForm.style.display="block";
    });
});

editRatings.forEach(form => {
    var button = form.querySelector(".cancelEditRating");
    button.addEventListener("click", () => {
        form.style.display="none";
    });
});

// Delete client ratings
deleteRatings.forEach(button => {
    button.addEventListener("click", function() {
        const rating = this.closest(".rating");
        const ratingForm = rating.nextElementSibling;
        ratingForm.style.display = "block";
    });
});

// Cancel delete
cancelDelete.forEach(button => {
    button.addEventListener('click', function() {
        const confirmBox = this.closest(".confirmDeleteRating");
        confirmBox.style.display = "none";
    });
});

// Add Comments
addCommentBtn.addEventListener('click', () => {
    commentForm.style.display='block';
});


// Cancel adding comment
if (cancelComment) {
    cancelComment.addEventListener('click', () => {
        commentForm.style.display="none";
    });
}

// Edit comment
editCommentBtns.forEach(button => {
    button.addEventListener('click', function() {
        var comment = this.closest('.comment');
        var comForm = comment.nextElementSibling;
        var editCommentForm = comForm.nextElementSibling;
        editCommentForm.style.display="block";
    });
});

// Cancel Editing
cancelComEdit.forEach(button => {
    button.addEventListener('click', function() {
        var form = button.closest('.edit-comment-popup');
        form.style.display='none';
    });
});

// Delete Comment
deleteCommentBtns.forEach(button => {
    button.addEventListener('click', function() {
        var thisComment = this.closest('.comment');
        var deleteForm = thisComment.nextElementSibling;
        deleteForm.style.display="block";
    });
});

// Cancel Comment Delete
cancelComDelete.forEach(button => {
    button.addEventListener('click', function() {
        var thisComment = this.closest(".confirmDeleteComment");
        thisComment.style.display="none";
    });
});