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
function rLoadModel() {
    return __awaiter(this, void 0, void 0, function* () {
        // await faceapi.loadTinyFaceDetectorModel("/public/models");
        yield faceapi.loadSsdMobilenetv1Model("/public/models");
    });
}
const rContainer = document.getElementById("upload-container");
const rImgInput = document.getElementById("imageInput");
const rImgDisplay = document.getElementById("imageDisplay");
const rMessage = document.getElementById("placeholder");
const rCanvas = document.getElementById("overlay");
const rCheckButton = document.getElementById("uploadbutton");
const rResultMessage = document.getElementById("face-recog");
function rDrawBox(imageElement, detection) {
    rCanvas.style.display = "block";
    faceapi.matchDimensions(rCanvas, imageElement);
    faceapi.draw.drawDetections(rCanvas, faceapi.resizeResults(detection, imageElement));
}
rCheckButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    // Send REST API request to backend http://localhost:3000/....
    rResultMessage.textContent = "";
    const formData = new FormData();
    if (!rImgInput.files || !rImgInput.files[0]) {
        alert("Img not found");
        return;
    }
    formData.append("image", rImgInput.files[0]);
    const response = yield fetch("http://localhost:3000/face-recognition", {
        method: "POST",
        body: formData,
    });
    const responseData = yield response.json();
    if (responseData.distance < 0.4) {
        rResultMessage.textContent = responseData.label;
    }
    else {
        rResultMessage.textContent = "No ref image matches this picture";
    }
}));
rContainer.addEventListener("click", () => {
    rImgInput.click();
});
rImgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        rImgDisplay.style.display = "block";
        rImgDisplay.src = URL.createObjectURL(file);
        rContainer.style.border = "none";
        rMessage.style.display = "none";
        // pass the image to the model;
        faceapi.detectAllFaces(rImgDisplay).then((result) => {
            console.log(result);
            // draw box
            if (result) {
                rDrawBox(rImgDisplay, result);
            }
        });
    }
});
rLoadModel().catch((err) => {
    console.log(err);
});
