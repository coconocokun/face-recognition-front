import { loadTinyFaceDetectorModel } from "./js/face-api.js";

async function loadModel() {
  await loadTinyFaceDetectorModel("./models");
}
