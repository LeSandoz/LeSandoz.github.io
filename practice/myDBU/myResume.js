let fileInput = document.getElementById("file-input");
let browseBtn = document.querySelector(".pointer");
let previewContainer = document.querySelector(".preview-container");
let upload = document.getElementById("upload");

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  previewContainer.innerHTML = "";
  for (let file of fileInput.files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let img = document.createElement("img");
      img.src = reader.result;
      previewContainer.appendChild(img);
    };
  }
});

upload.onclick = function(){
    alert("Document has been uploaded.")
}
