const categories = [
    "AI", "Anime & Manga", "Automotives", "Blogging", "Bodybuilding", 
    "Beauty", "Cooking", "Dancing", "Dermatologist", "Dentist",
    "DIY Arts & Crafts", "Education", "Fashion", "Filmmaking & Cinematography",
    "Finance", "Fitness", "Food", "Gaming", "Haircare", "Health & Wellness",
    "Home & Decor", "Lifestyle", "Makeup", "Memes", "Men Fashion",
    "Nailart", "News", "Nutrition & Diet", "Entertainment", "Parenting & Family",
    "Pet Lovers", "Podcast", "Poetry", "Science", "Singing", "Skincare",
    "Tech & Gadgets", "Travel", "TV Show Reviews", "Tech"
];

function loadCategories() {
    const dropdown = document.getElementById("categoryDropdown");

    // Clear existing categories
    dropdown.innerHTML = ""; 

    categories.forEach(category => {
        const option = document.createElement("div");
        option.classList.add("dropdown-item");
        option.textContent = category;

        // Click event to select category
        option.addEventListener("click", function() {
            document.getElementById("categorySearch").value = category;
            dropdown.style.display = "none"; // Hide dropdown after selection
        });

        dropdown.appendChild(option);
    });
}

// Filter function for search
function filterCategories() {
    const input = document.getElementById("categorySearch").value.toLowerCase();
    const items = document.querySelectorAll(".dropdown-item");
    const dropdown = document.getElementById("categoryDropdown");

    let hasResults = false;
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(input)) {
            item.style.display = "block";
            hasResults = true;
        } else {
            item.style.display = "none";
        }
    });

    dropdown.style.display = hasResults ? "block" : "none"; // Show/hide dropdown
}

// Event listeners
document.addEventListener("DOMContentLoaded", loadCategories);
document.getElementById("categorySearch").addEventListener("input", filterCategories);
document.addEventListener("click", function(e) {
    const dropdown = document.getElementById("categoryDropdown");
    if (!e.target.closest(".dropdown-category")) {
        dropdown.style.display = "none"; // Hide when clicking outside
    }
});
