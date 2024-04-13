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
function loadModel() {
    return __awaiter(this, void 0, void 0, function* () {
        yield faceapi.loadTinyFaceDetectorModel("/public/models");
        // await faceapi.loadSsdMobilenetv1Model("/public/models");
    });
}
const container = document.getElementById("upload-container");
const imgInput = document.getElementById("imageInput");
const imgDisplay = document.getElementById("imageDisplay");
const message = document.getElementById("placeholder");
const canvas = document.getElementById("overlay");
function drawBox(imageElement, detection) {
    canvas.style.display = "block";
    faceapi.matchDimensions(canvas, imageElement);
    faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, imageElement));
}
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
        faceapi.detectAllFaces(imgDisplay, new faceapi.TinyFaceDetectorOptions()).then((result) => {
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
