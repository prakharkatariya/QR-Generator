const qrText = document.getElementById('qr-text');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');

let qrCode = null;

function generateQRCode() {
    const text = qrText.value.trim();

    if (!text) {
        alert("Please enter a URL or text");
        return;
    }

    // Clear previous QR code
    qrCodeContainer.innerHTML = "";
    downloadBtn.classList.add('hidden');

    // Generate new QR code
    // qrcode.js library usage
    // new QRCode(element, text/options)

    try {
        qrCode = new QRCode(qrCodeContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Wait for image to be generated before showing download button
        setTimeout(() => {
            const qrImage = qrCodeContainer.querySelector('img');
            if (qrImage) {
                downloadBtn.classList.remove('hidden');
            }
        }, 100);

    } catch (error) {
        console.error("Error generating QR code:", error);
        alert("Failed to generate QR code. Please try again.");
    }
}

generateBtn.addEventListener('click', generateQRCode);

qrText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

downloadBtn.addEventListener('click', () => {
    const qrImage = qrCodeContainer.querySelector('img');
    if (qrImage) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
