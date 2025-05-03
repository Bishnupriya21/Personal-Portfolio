document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    emailjs.send("service_esqo4ls", "template_i9049eh", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    })
    .then(function(response) {
        alert("Message sent successfully!");
    }, function(error) {
        alert("Failed to send message. Please try again.");
    });
});
