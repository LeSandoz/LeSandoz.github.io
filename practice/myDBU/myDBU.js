let darkModeBtn = document.getElementById("darkModeBtn");
let context = document.getElementById("context");

darkModeBtn.onclick = function(){
    context.classList.toggle("darkMode");
    // alert("dark mode");
}

let WorkFinder =  document.getElementById("WorkFinder"); 

WorkFinder.onclick = function(){
    window.open("./WorkFinder.html")
}