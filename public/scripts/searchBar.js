const clearIcon = document.querySelector('.clear-icon');
const searchBar = document.querySelector('.search');
const doSearch = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');


clearIcon.addEventListener("click", () => {
    searchBar.value = '';
});

doSearch.addEventListener('click', () => {
    searchForm.submit();
});
