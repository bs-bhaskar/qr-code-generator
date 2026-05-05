// Get references to HTML elements
let imgBox = document.getElementById("imgBox");//imgBox → container where QR visible
let qrImage = document.getElementById("qrImage");//qrImage → actual <img> where QR load
let qrText = document.getElementById("qrText");//qrText → input field
let downloadBtn = document.getElementById("downloadBtn");//downloadBtn → download button

// Function to generate QR code
function generateQr() {//function where QR generate
  const data = qrText.value.trim(); // Get text from input
  // .value → input text
  // .trim() → remove extra spaces

  if (data === "") {
    imgBox.classList.remove("show-img");
    qrImage.src = "";
    downloadBtn.style.display = "none";
    // if input blank:
    // remove QR
    // Image clear
    // Download button hide
    return;//return → function stops here
  }

  // Create QR API URL with encoded text
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(data);
  // here we use External API (QR server)
  // encodeURIComponent(data) → it make special characters safe

  // Reset previous states before loading new QR
  imgBox.classList.remove("show-img");
  qrImage.style.display = "none";
  downloadBtn.style.display = "none";

  // Load QR image and show after it's ready
  qrImage.onload = () => {
    imgBox.classList.add("show-img");
    qrImage.style.display = "block";
    downloadBtn.style.display = "block";
  };

  // Set new image source
  qrImage.src = qrUrl;
}

// Function to download QR code image
function downloadQr() {
  const qrUrl = qrImage.src;//takes current QR image URL
  const link = document.createElement("a");//then create a fake anchor tag
  link.href = qrUrl;
  link.download = "qrcode.png";//said browser download this file

  document.body.appendChild(link);//add link
  link.click();//click trigger
  document.body.removeChild(link);//then remove it
}

// Auto-clear when typing and input becomes empty
qrText.addEventListener("input", () => {//when ever user type
  if (qrText.value.trim() === "") {//if input empty
    //clean every thing UI/UX become smooth
    imgBox.classList.remove("show-img");
    qrImage.src = "";
    downloadBtn.style.display = "none";
  }
});


// Toggle dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

//  Overall Flow 
// User write text
// Button click → QR generate
// Get QR image  image from API
// show after load
// Download button active
// Input empty → everything reset
// Dark mode → theme change