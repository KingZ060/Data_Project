function previewImage() {
    handleFileInput(function(img) {
    });
}

function convertToASCII() {
    handleFileInput(function(img) {
        const ascii = imageToAscii(img);
        document.getElementById('ascii').value = ascii;
    });
}

function handleFileInput(processImageCallback) {
    const fileInput = document.getElementById('imageInput');
    if (!fileInput.files[0]) {
        alert('Please upload an image first.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            img.style.maxWidth = '100%';
            img.style.display = 'block';
            img.style.margin = 'auto';

            const originalImage = document.getElementById('originalImage');
            originalImage.innerHTML = '';
            originalImage.appendChild(img);
            
            processImageCallback(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
}

function imageToAscii(img) {//Get help from Chatgpt
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = 100;
    const height = img.height * (width / img.width);

    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    let ascii = '';
    const grayScales = '@%#*+=-:. ';

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const index = (i * width + j) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const average = (r + g + b) / 3;
            const charIndex = (average / 255) * (grayScales.length - 1);
            ascii += grayScales.charAt(charIndex);
        }
        ascii += '\n';
    }

    return ascii;
}
