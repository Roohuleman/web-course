document.getElementById("btn");
btn.addEventListener("click",()=>{
    console.log("Button clicked!");
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    }
})
document.getElementById("btn1")
btn1.addEventListener("click",()=>{
    alert("WELCOME TO MY WEBSITE");
})