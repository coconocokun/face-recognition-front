async function rLoadModel() {
  // await faceapi.loadTinyFaceDetectorModel("/public/models");
  await faceapi.loadSsdMobilenetv1Model("/public/models");
}

const rContainer = document.getElementById("upload-container")!;
const rImgInput = document.getElementById("imageInput")! as HTMLInputElement;
const rImgDisplay = document.getElementById("imageDisplay")! as HTMLImageElement;
const rMessage = document.getElementById("placeholder")!;
const rCanvas = document.getElementById("overlay")! as HTMLCanvasElement;
const rCheckButton = document.getElementById("uploadbutton")! as HTMLButtonElement;
const rResultMessage = document.getElementById("face-recog")! as HTMLSpanElement;

function rDrawBox(imageElement: HTMLImageElement, detection: any) {
  rCanvas.style.display = "block";
  faceapi.matchDimensions(rCanvas, imageElement);
  faceapi.draw.drawDetections(rCanvas, faceapi.resizeResults(detection, imageElement));
}

rCheckButton.addEventListener("click", async () => {
  // Send REST API request to backend http://localhost:3000/....
  rResultMessage.textContent = "";
  const formData = new FormData();
  if (!rImgInput.files || !rImgInput.files[0]) {
    alert("Img not found");
    return;
  }
  formData.append("image", rImgInput.files[0]);
  const response = await fetch("http://localhost:3000/face-recognition", {
    method: "POST",
    body: formData,
  });
  const responseData = await response.json();
  if (responseData.distance < 0.4) {
    rResultMessage.textContent = responseData.label;
  } else {
    rResultMessage.textContent = "No ref image matches this picture";
  }
});

rContainer.addEventListener("click", () => {
  rImgInput.click();
});

rImgInput.addEventListener("change", (e) => {
  const file = (e.target as HTMLInputElement).files![0];

  if (file) {
    rImgDisplay.style.display = "block";
    rImgDisplay.src = URL.createObjectURL(file);
    rContainer.style.border = "none";
    rMessage.style.display = "none";

    // pass the image to the model;
    faceapi.detectAllFaces(rImgDisplay).then((result: any) => {
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
