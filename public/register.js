"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rContainer = document.getElementById("upload-container");
const rImgInput = document.getElementById("imageInput");
const rImgDisplay = document.getElementById("imageDisplay");
const rMessage = document.getElementById("placeholder");
const rCanvas = document.getElementById("overlay");
const rCheckButton = document.getElementById("uploadbutton");
const rResultMessage = document.getElementById("face-recog");
checkButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    // Send REST API request to backend http://localhost:3000/....
    resultMessage.textContent = "";
    const formData = new FormData();
    if (!imgInput.files || !imgInput.files[0]) {
        alert("Img not found");
        return;
    }
    formData.append("image", imgInput.files[0]);
    const response = yield fetch("http://localhost:3000/face-recognition", {
        method: "POST",
        body: formData,
    });
    const responseData = yield response.json();
    if (responseData.distance < 0.4) {
        resultMessage.textContent = responseData.label;
    }
    else {
        resultMessage.textContent = "No ref image matches this picture";
    }
}));
container.addEventListener("click", () => {
    imgInput.click();
});
imgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        imgDisplay.style.display = "block";
        imgDisplay.src = URL.createObjectURL(file);
        container.style.border = "none";
        message.style.display = "none";
        // pass the image to the model;
        faceapi.detectAllFaces(imgDisplay).then((result) => {
            console.log(result);
            // draw box
            if (result) {
                drawBox(imgDisplay, result);
            }
        });
    }
});
loadModel().catch((err) => {
    console.log(err);
});
