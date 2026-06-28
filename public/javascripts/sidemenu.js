console.log("Script connected successfully!");

document.addEventListener("DOMContentLoaded", function () {
  
  // Target elements (Removed closeBtn)
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("my-sidebar");

  // Step 1: Check if elements are found
  if (!menuBtn || !sidebar) {
    console.error("ELEMENTS MISSING:", { menuBtn, sidebar });
    return; 
  }

  console.log("All elements found perfectly.");

  // Step 2: Toggle the menu open/closed using the same button
  menuBtn.addEventListener("click", function(event) {
    console.log("Menu button clicked!");
    
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0";
    } else {
      sidebar.style.width = "250px";
    }
    
    event.stopPropagation();
  });

  // Step 3: Close the menu if clicking anywhere outside of it
  document.addEventListener("click", function(event) {
    if (sidebar.style.width === "250px" && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.style.width = "0";
    }
  });
});
