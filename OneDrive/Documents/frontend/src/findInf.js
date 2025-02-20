document.addEventListener("DOMContentLoaded", function () {

    // Sample notifications data
    const notifications = [
        { type: "invite", username: "BrandX", message: "sent an invite" },
        { type: "request", username: "InfluencerY", message: "made a request" }
    ];

    const notificationIcon = document.querySelector(".notification-icon");
    const notificationPopup = document.getElementById("notificationPopup");
    const notificationContent = document.getElementById("notificationContent");
    const closeNotification = document.getElementById("closeNotification");

    // Toggle notification popup
    notificationIcon.addEventListener("click", function () {
        notificationPopup.classList.toggle("active");
        updateNotifications();
    });

    // Close notification popup
    closeNotification.addEventListener("click", function () {
        notificationPopup.classList.remove("active");
    });

    // Update notifications content
    function updateNotifications() {
        notificationContent.innerHTML = ""; // Clear previous content

        if (notifications.length === 0) {
            notificationContent.innerHTML = "<p>No notifications yet.</p>";
        } else {
            notifications.forEach(notification => {
                const notificationItem = document.createElement("div");
                notificationItem.classList.add("notification-item");
                notificationItem.innerHTML = `
                    <p><strong>${notification.username}</strong> ${notification.message}</p>
                `;
                notificationContent.appendChild(notificationItem);
            });
        }
    }

    // Initial update of notifications
    updateNotifications();

    // Sample influencer data (In real implementation, fetch from backend)
    const influencers = [
        { name: "Influencer 1", platform: "instagram", niche: "Lifestyle", followers: "231k", engagement: "50%" },
        { name: "Influencer 2", platform: "youtube", niche: "Blogging", followers: "123k", engagement: "82%" },
        { name: "Influencer 3", platform: "instagram", niche: "Cooking", followers: "52k", engagement: "73%" },
        { name: "Influencer 4", platform: "youtube", niche: "cleaning", followers: "121k", engagement: "54%"}
    ];

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

    const findInfluencersLink = document.querySelector('.sidebar-menu a i.fa-search').parentElement;

    findInfluencersLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Get the container where influencers will be displayed
    const influencerList = document.getElementById("influencer-list");

    // Platform icons
    const platformIcons = {
        instagram: '<i class="fab fa-instagram platform-icon" style="color: #E1306C;"></i>',
        youtube: '<i class="fab fa-youtube platform-icon" style="color: #FF0000;"></i>'
    };

    // Function to parse follower count (e.g., "52k" -> 52000, "1M" -> 1000000)
    function getFollowersCount(followers) {
        if (!followers) return 0;

        // Remove non-numeric characters and parse the number
        const num = parseFloat(followers);

        // Handle "k" (thousand) and "M" (million) suffixes
        if (followers.toLowerCase().includes('k')) {
            return num * 1000;
        } else if (followers.toLowerCase().includes('m')) {
            return num * 1000000;
        }

        return num; // If no suffix, return the number as is
    }

    // Function to display influencers
    function displayInfluencers(filteredInfluencers) {
        const influencerList = document.getElementById("influencer-list");
        influencerList.innerHTML = ''; // Clear previous results

        if (filteredInfluencers.length === 0) {
            influencerList.innerHTML = '<p>No influencers found based on the selected filters.</p>';
            return;
        }

        filteredInfluencers.forEach(influencer => {
            const influencerItem = document.createElement("div");
            influencerItem.classList.add("result-item");
            influencerItem.setAttribute("data-name", influencer.name);
            influencerItem.innerHTML = `
                <span>${influencer.name}</span>
                <span>${influencer.niche}</span>
                <span>${influencer.followers} Followers</span>
                <span>${influencer.engagement}</span>
                <button class="invite-btn">Send invite</button>
            `;
            influencerList.appendChild(influencerItem);
        });

        const inviteButtons = document.querySelectorAll(".invite-btn");
        const confirmationPopup = document.getElementById("confirmationPopup");
        const popupYesButton = document.getElementById("popupYes");
        const popupNoButton = document.getElementById("popupNo");

        // Hide the popup initially using JavaScript
        confirmationPopup.style.display = "none";

        inviteButtons.forEach(button => {
            button.addEventListener("click", function () {
                if (button.textContent === "Sent ✅") {
                    // Show the pop-up only when clicking again after sending
                    confirmationPopup.style.display = "block";

                    // Store the clicked button reference
                    confirmationPopup.dataset.currentButton = button;
                } else {
                    // First-time click → Send invite
                    button.textContent = "Sent ✅";
                    button.style.background = "#28a745";
                    button.disabled = true;
                }
            });
        });

        // Handle "Yes" click (retrieve the invite)
        popupYesButton.addEventListener("click", function () {
            const button = confirmationPopup.dataset.currentButton;
            if (button) {
                button.textContent = "Send Invite";
                button.style.background = "";
                button.disabled = false;
            }
            confirmationPopup.style.display = "none";
        });

        // Handle "No" click (just close pop-up)
        popupNoButton.addEventListener("click", function () {
            confirmationPopup.style.display = "none";
        });
    }

    // Event listener for filtering based on platform, followers, and category
    const platformSelect = document.getElementById('platformSelect');
    const followersSelect = document.getElementById('followersSelect');
    const categorySearch = document.getElementById('categorySearch');

    function filterInfluencers() {
        const platform = platformSelect.value;
        const followers = followersSelect.value;
        const category = categorySearch.value.toLowerCase();

        const filteredInfluencers = influencers.filter(influencer => {
            const isPlatformMatch = platform ? influencer.platform === platform : true;
            const isCategoryMatch = category ? influencer.niche.toLowerCase().includes(category) : true;

            const followerCount = getFollowersCount(influencer.followers);
            let isFollowersMatch = true;
            if (followers) {
                switch (followers) {
                    case 'nano':
                        isFollowersMatch = followerCount < 10000;
                        break;
                    case 'micro':
                        isFollowersMatch = followerCount >= 10000 && followerCount < 100000;
                        break;
                    case 'macroA':
                        isFollowersMatch = followerCount >= 100000 && followerCount < 500000;
                        break;
                    case 'macroB':
                        isFollowersMatch = followerCount >= 500000 && followerCount < 1000000;
                        break;
                    case 'mega':
                        isFollowersMatch = followerCount >= 1000000;
                        break;
                }
            }

            return isPlatformMatch && isFollowersMatch && isCategoryMatch;
        });

        displayInfluencers(filteredInfluencers);
    }

    // Add event listeners for filtering
    platformSelect.addEventListener('change', filterInfluencers);
    followersSelect.addEventListener('change', filterInfluencers);
    categorySearch.addEventListener('input', filterInfluencers);

    // Initial display of all influencers
    displayInfluencers(influencers);

    // Add event listener for search input (filter by name)
    document.getElementById("searchInput").addEventListener("input", function() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let items = document.querySelectorAll(".result-item");
        
        items.forEach(item => {
            let name = item.getAttribute("data-name").toLowerCase();
            if (name.includes(input)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
});