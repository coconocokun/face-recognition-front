const rContainer = document.getElementById("upload-container")!;
const rImgInput = document.getElementById("imageInput")! as HTMLInputElement;
const rImgDisplay = document.getElementById("imageDisplay")! as HTMLImageElement;
const rMessage = document.getElementById("placeholder")!;
const rCanvas = document.getElementById("overlay")! as HTMLCanvasElement;
const rCheckButton = document.getElementById("uploadbutton")! as HTMLButtonElement;
const rResultMessage = document.getElementById("face-recog")! as HTMLSpanElement;

checkButton.addEventListener("click", async () => {
  // Send REST API request to backend http://localhost:3000/....
  resultMessage.textContent = "";
  const formData = new FormData();
  if (!imgInput.files || !imgInput.files[0]) {
    alert("Img not found");
    return;
  }
  formData.append("image", imgInput.files[0]);
  const response = await fetch("http://localhost:3000/face-recognition", {
    method: "POST",
    body: formData,
  });
  const responseData = await response.json();
  if (responseData.distance < 0.4) {
    resultMessage.textContent = responseData.label;
  } else {
    resultMessage.textContent = "No ref image matches this picture";
  }
});

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
