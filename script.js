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
            Authorization: "4947ee97fce8973" // Replace with your Imgur Client ID
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response data
        if (data.success) {
            const imageUrl = data.data.link; // Get the public URL
            console.log("Image URL:", imageUrl); // Log the image URL

            // Generate the QR Code with the new image URL
            const qrImage = document.createElement("img");
            const qrURL = `https://quickchart.io/qr?text=${encodeURIComponent(imageUrl)}&size=200`;
            qrImage.src = qrURL; // Set the src of the qrImage to the qrURL
            console.log("QR Code Image Source:", qrImage.src); // Log the QR code image source

            // Display the QR Code in the new container
            const qrDisplay = document.getElementById("qrDisplay");
            qrDisplay.innerHTML = ""; // Clear previous QR codes
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
