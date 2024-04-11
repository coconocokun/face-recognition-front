async function loadModel() {
  await faceapi.loadTinyFaceDetectorModel("/public/models");
  // await faceapi.loadSsdMobilenetv1Model("/public/models");
}
