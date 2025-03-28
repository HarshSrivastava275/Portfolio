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
    event.preventDefault();  

    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    console.log("Submitting Form Data:", { name, email, message });

    try {
        
        const response = await fetch("https://portfolio-vr3x.onrender.com", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

         
        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
            alert("Your message has been sent successfully!"); 
            document.getElementById("contactForm").reset(); 
        } else {
            alert("Failed to send message: " + data.message); 
        }

    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to send message. Please try again later.");
    }
});
