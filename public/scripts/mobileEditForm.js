const addCoachbtn = document.getElementById('mobileAddCoach');
const assignCoachForm = document.getElementById('mobileAssignCoachPopup');
const cancelCoachForm = document.getElementById('mobile-cancel-btn');

// Edit profile contents 

const editOpen = document.querySelector('.mobile-edit-pencil');
const editForm = document.querySelector('#mobile-popup-form');
const cancelEditButton = document.getElementById('mobileCancelEdit');

// Edit Comment contents

const addNewCommentBtn = document.getElementById('mobileAddComment');
const addNewCommentForm =document.getElementById('mobileCommentPopup');
const mobileCancelComment = document.getElementById('mobileCancelComment');


const editCommentPencil = document.querySelector('.mobilecommentPencil');
const editCommentForm = document.querySelector('.mobile-edit-comment-popup');
const cancelCommentEdit = document.getElementById('mobileCancelCommentEdit');


const deleteCommentBtn = document.querySelectorAll('.mobiledeleteComments');
const deleteCommentWarning = document.querySelector('.mobileconfirmDeleteComment');
const cancelCommentDelete = document.querySelectorAll('.mobilecancelComDelete');

// Edit Rating contents

const deleteRating = document.querySelectorAll('.mobileDeleteRatingBtn');
const deleteRatingWaring = document.querySelector('.mobileCnfirmDeleteRating');
const cancelRatingDelete = document.querySelectorAll('.mobileCancelDelete');

// DOM Manipulation 

addCoachbtn.addEventListener('click', () => {
    assignCoachForm.style.display="block";
});

if (cancelCoachForm) {
    cancelCoachForm.addEventListener('click', () => {
        assignCoachForm.style.display='none';
    });
};

// Edit profile contents

editOpen.addEventListener('click', () => {
    editForm.style.display='block';
});

cancelEditButton.addEventListener('click', () => {
    editForm.style.display='none';
});

// Edit comment contents

editCommentPencil.addEventListener('click', () => {
    editCommentForm.style.display="block";
});

cancelCommentEdit.addEventListener('click', () => {
    editCommentForm.style.display='none';
});

addNewCommentBtn.addEventListener('click', () => {
    addNewCommentForm.style.display='block';
});

mobileCancelComment.addEventListener('click', () => {
    addNewCommentForm.style.display='none';
});

deleteCommentBtn.forEach(button => {
    button.addEventListener('click', function() {
        var thisComment = this.closest('.mobileComment');
        var nextForm = thisComment.nextElementSibling;
        nextForm.style.display='block';
    });
});

cancelCommentDelete.forEach(btn => {
    btn.addEventListener('click', function() {
        var form = this.closest('.mobileconfirmDeleteComment');
        form.style.display='none';
    });
});

// Edit rating contents

deleteRating.forEach(button => {
    button.addEventListener('click', function() {
        var thisRating = this.closest('.mobile-rating');
        var confirmForm = thisRating.nextElementSibling;
        confirmForm.style.display='block';
    });
});

cancelRatingDelete.forEach(button => {
    button.addEventListener('click', function() {
        var thisForm = this.closest('.mobileConfirmDeleteRating');
        thisForm.style.display='none';
    });
});