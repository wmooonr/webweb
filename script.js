// Store system details in localStorage
const systemData = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language
};
localStorage.setItem("systemData", JSON.stringify(systemData));

// Display system details in footer
const footerInfo = document.querySelector(".storage-info");
footerInfo.textContent = "Client System Info: " + localStorage.getItem("systemData");

// Fetch client comments from JSONPlaceholder for variant 29
fetch("https://jsonplaceholder.typicode.com/posts/29/comments")
  .then(res => {
    if (!res.ok) throw new Error("Failed to retrieve data");
    return res.json();
  })
  .then(data => {
    const commentsContainer = document.querySelector(".comments");
    commentsContainer.innerHTML = "";
    data.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `
        <p><strong>${comment.name}</strong></p>
        <p>${comment.body}</p>
        <p><em>Contact: ${comment.email}</em></p>
      `;
      commentsContainer.appendChild(commentDiv);
    });
  })
  .catch(err => {
    document.querySelector(".comments").textContent = "Unable to load client feedback.";
    console.error(err);
  });

// Modal display logic after 1 minute on site
const modal = document.querySelector(".modal");
let timer;

if (localStorage.getItem("modalDismissed") !== "true") {
  timer = setTimeout(() => {
    modal.style.display = "flex";
  }, 60000);
}

// Close modal on 'X' click
document.querySelector(".close-modal").addEventListener("click", () => {
  modal.style.display = "none";
  localStorage.setItem("modalDismissed", "true");
  clearTimeout(timer);
});

// Theme toggle button
const themeBtn = document.querySelector(".theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Auto-switch theme depending on time
const currentHour = new Date().getHours();
if (currentHour < 7 || currentHour >= 21) {
  document.body.classList.add("dark-mode");
}
