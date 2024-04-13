async function loadModel() {
  await faceapi.loadTinyFaceDetectorModel("/public/models");
  // await faceapi.loadSsdMobilenetv1Model("/public/models");
}

const container = document.getElementById("upload-container")!;
const imgInput = document.getElementById("imageInput")! as HTMLInputElement;
const imgDisplay = document.getElementById("imageDisplay")! as HTMLImageElement;
const message = document.getElementById("placeholder")!;
const canvas = document.getElementById("overlay")! as HTMLCanvasElement;

function drawBox(imageElement: HTMLImageElement, detection: any) {
  canvas.style.display = "block";
  faceapi.matchDimensions(canvas, imageElement);
  faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, imageElement));
}

container.addEventListener("click", () => {
  imgInput.click();
});

imgInput.addEventListener("change", (e) => {
  const file = (e.target as HTMLInputElement).files![0];

  if (file) {
    imgDisplay.style.display = "block";
    imgDisplay.src = URL.createObjectURL(file);
    container.style.border = "none";
    message.style.display = "none";

    // pass the image to the model;
    faceapi.detectAllFaces(imgDisplay).then((result: any) => {
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
