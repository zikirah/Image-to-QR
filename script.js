document.getElementById("generateQR").addEventListener("click", function() {
    const imageInput = document.getElementById("imageInput").files[0];

    if (!imageInput) {
        alert("Please select an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput);

    // Upload the image to Imgur
    fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
            Authorization: "Client-ID 4947ee97fce8973" // Ensure you use 'Client-ID' format if required
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 429) {
                // You may show a user-friendly message or implement retry logic here.
                throw new Error("Too many requests - please try again later.");
            }
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response data
        if (data.success) {
            const imageUrl = data.data.link; // Get the public URL
            console.log("Image URL:", imageUrl);
            // Generate the QR Code with the new image URL
            const qrImage = document.createElement("img");
            const qrURL = `https://quickchart.io/qr?text=${encodeURIComponent(imageUrl)}&size=200`;
            qrImage.src = qrURL;
            console.log("QR Code Image Source:", qrImage.src);
            // Display the QR Code
            const qrDisplay = document.getElementById("qrDisplay");
            qrDisplay.innerHTML = "";
            qrDisplay.appendChild(qrImage);
        } else {
            alert("Error uploading image. Try again!");
        }
    })
    .catch(error => {
        console.error("Upload error:", error);
        alert("An error occurred: " + error.message);
    });
});
