const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () =>{
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll", () =>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    alternateStyle.forEach((style) =>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled","true");
        }
    })
}
const darkBtn = document.querySelector('.day-night');

const darkMode = () => {
    document.body.classList.toggle("dark")
}

darkBtn.addEventListener('click', () => {
    // Get the value of the "dark" item from the local storage on every click
    setDarkMode = localStorage.getItem('darke');

    if(setDarkMode !== "on") {
        darkMode();
        // Set the value of the itwm to "on" when dark mode is on
        setDarkMode = localStorage.setItem('darke', 'on');
    } else {
        darkMode();
        // Set the value of the item to  "null" when dark mode if off
        setDarkMode = localStorage.setItem('darke', null);
    }
});

// Get the value of the "dark" item from the local storage
let setDarkMode = localStorage.getItem('darke');

// Check dark mode is on or off on page reload
if(setDarkMode === 'on') {
    darkMode();
}

window.addEventListener("load", () =>{
    if(document.body.classList.contains("dark")){
        darkBtn.querySelector("i").classList.add("fa-sun");
    }
    else{
        darkBtn.querySelector("i").classList.add("fa-moon");
    }
})
