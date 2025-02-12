document.getElementById("generateQR").addEventListener("click", async function() {
    const imageInput = document.getElementById("imageInput").files[0];

    if (!imageInput) {
        alert("Please select an image first!");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput);

    try {
        const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID 4947ee97fce8973" // Ensure you use 'Client-ID' format
            },
            body: formData
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Too many requests - please wait and try again later.");
            }
            throw new Error(`Upload failed! Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data || !data.success || !data.data.link) {
            throw new Error("Failed to upload image. Please try again!");
        }

        const imageUrl = data.data.link;
        console.log("Uploaded Image URL:", imageUrl);

        // Generate QR Code
        const qrImage = document.createElement("img");
        const qrURL = `https://quickchart.io/qr?text=${encodeURIComponent(imageUrl)}&size=200`;
        qrImage.src = qrURL;

        // Display the QR Code
        const qrDisplay = document.getElementById("qrDisplay");
        qrDisplay.innerHTML = "";
        qrDisplay.appendChild(qrImage);

    } catch (error) {
        console.error("Upload error:", error);
        alert("Error: " + error.message);
    }
});
