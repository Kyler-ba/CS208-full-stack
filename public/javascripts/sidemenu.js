console.log("Script connected successfully!");

// Target elements
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("my-sidebar");

// Step 1: Check if elements are found
if (!menuBtn || !sidebar || !closeBtn) {
  console.error("ELEMENTS MISSING:", { menuBtn, sidebar, closeBtn });
  alert("Error: Script loaded, but elements are missing from the page!");
} else {
  console.log("All elements found perfectly.");

  // Step 2: Test the click listener
  menuBtn.addEventListener("click", function(event) {
    console.log("Image was clicked!");
    alert("Image clicked! Changing sidebar width to 250px...");
    sidebar.style.width = "250px";
    event.stopPropagation();
  });

  closeBtn.addEventListener("click", function() {
    sidebar.style.width = "0";
  });

  document.addEventListener("click", function(event) {
    if (sidebar.style.width === "250px" && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.style.width = "0";
    }
  });
}