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


const editCommentPencils = document.querySelectorAll('.mobilecommentPencil');
const editCommentForm = document.querySelector('.mobile-edit-comment-popup');
const cancelCommentEdit = document.querySelectorAll('#mobileCancelCommentEdit');


const deleteCommentBtn = document.querySelectorAll('.mobiledeleteComments');
const deleteCommentWarning = document.querySelector('.mobileconfirmDeleteComment');
const cancelCommentDelete = document.querySelectorAll('.mobilecancelComDelete');

// Edit Rating contents

const mobileAddRatingBtn = document.getElementById('mobileAddRating');
const addRatingField = document.getElementById('mobile-rating-popup');
const cancelAddRating = document.getElementById('mobilecancelBtn');

const deleteRating = document.querySelectorAll('.mobileDeleteRatingBtn');
const deleteRatingWaring = document.querySelector('.mobileCnfirmDeleteRating');
const cancelRatingDelete = document.querySelectorAll('.mobileCancelDelete');

const mobileEditRatingPencil = document.querySelectorAll('.mobileRatingPencil');
const mobileCancelEditRatingBtns = document.querySelectorAll('.mobileCancelEditRating');

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

if (editCommentPencils) {
        editCommentPencils.forEach(pencil => {
            pencil.addEventListener('click', function() {
                let thisComment = this.closest('.mobileComment');
                let nextOne = thisComment.nextElementSibling;
                let editThisComment = nextOne.nextElementSibling;
                editThisComment.style.display='block';
            });
        });
};


if (cancelCommentEdit) {
        cancelCommentEdit.forEach(comment => {
            comment.addEventListener('click', function() {
                let thisEditComment = this.closest('.mobile-edit-comment-popup');
                thisEditComment.style.display='none';
            });
    });
};



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
        var mobileForm = this.closest('.mobileconfirmDeleteComment');
        mobileForm.style.display='none';
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

mobileAddRatingBtn.addEventListener('click', () => {
    addRatingField.style.display='block';
});

if (cancelAddRating) {
    cancelAddRating.addEventListener('click', () => {
        addRatingField.style.display='none';
    });
};

if (mobileEditRatingPencil) {
    mobileEditRatingPencil.forEach(pencil => {
        pencil.addEventListener('click', function() {
            var thisMobileRating = this.closest('.mobile-rating');
            var notThisOne = thisMobileRating.nextElementSibling;
            var thisMobileRatingEdit = notThisOne.nextElementSibling;
            thisMobileRatingEdit.style.display='block';
        });
    });
};

if (mobileCancelEditRatingBtns) {
    mobileCancelEditRatingBtns.forEach(button => {
        button.addEventListener('click', function() {
            let thisMobileeditRatingForm = this.closest('.mobile-edit-rating-popup');
            thisMobileeditRatingForm.style.display='none';
        });
    });
}