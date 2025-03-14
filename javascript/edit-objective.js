// Check if the user is an admin
function checkAdminStatus() {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const editButton = document.getElementById("edit-btn");
    
    if (isAdmin && editButton) {
        editButton.style.display = "block"; 
        editButton.addEventListener("click", enableEditing); 
    } else {
        console.log("Admin status is not set or Edit button not found.");
    }
}

// Function to enable editing of specific parts of objective.html content
function enableEditing() {
    const sections = document.querySelectorAll(
        "#objective-content p, #objective-content ul, #date-time"
    );

    sections.forEach(section => {
        section.contentEditable = true; 
        section.style.border = "1px dashed #003366"; 
        section.style.padding = "5px"; 
        section.style.backgroundColor = "#f9f9f9"; 
    });

    
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save Changes";
    saveButton.style.marginTop = "1rem";
    saveButton.onclick = saveChanges;
    document.body.appendChild(saveButton);
}


function saveChanges() {
    const sections = document.querySelectorAll("section p, section ul, #date-time");
    let updatedContent = [];

    sections.forEach(section => {
        updatedContent.push(section.innerHTML); 
    });

    localStorage.setItem("objectiveContent", JSON.stringify(updatedContent));
    alert("Changes saved! (This should be sent to a backend in a real app)");
}


function loadSavedContent() {
    const savedContent = JSON.parse(localStorage.getItem("objectiveContent"));
    if (savedContent) {
        const sections = document.querySelectorAll("section p, section ul, #date-time");
        sections.forEach((section, index) => {
            if (savedContent[index]) {
                section.innerHTML = savedContent[index]; 
            }
        });
    }
}

// Run functions on page load
document.addEventListener("DOMContentLoaded", () => {
    checkAdminStatus();
    loadSavedContent();
});
