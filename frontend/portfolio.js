var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.target.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemeu = document.getElementById("sidemenu");
function openmenu(){
    sidemeu.style.right="0";
}
function closemenu(){
    sidemeu.style.right="-200px";
}

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // ✅ Prevent page reload on form submission

    // ✅ Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ❌ Validate form inputs
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    console.log("Submitting Form Data:", { name, email, message });

    try {
        // ✅ Corrected API endpoint
        const response = await fetch("http://localhost:8080/contact", { // Change to your deployed URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        // ✅ Handle response properly
        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
            alert("Your message has been sent successfully!"); // ✅ Show success message
            document.getElementById("contactForm").reset(); // ✅ Clear form after success
        } else {
            alert("Failed to send message: " + data.message); // ❌ Show error message
        }

    } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert("Failed to send message. Please try again later.");
    }
});
