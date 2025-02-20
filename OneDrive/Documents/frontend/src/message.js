const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeIcon = document.querySelector("#closeIcon"); // Ensure ID is correctly referenced
const overlay = document.createElement("div"); // Create an overlay for better UX

overlay.classList.add("overlay");
document.body.appendChild(overlay);

// Open sidebar when clicking the menu icon
menuIcon.addEventListener("click", function () {
    sidebar.classList.add("active");
    overlay.classList.add("active");
});

// Close sidebar when clicking the close icon
closeIcon.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});

// Close sidebar when clicking the overlay
overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});

const findInfluencersLink = document.querySelector('.sidebar-menu a i.fa-envelope').parentElement;

findInfluencersLink.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
});