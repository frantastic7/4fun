const sliderlen = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copybtn = document.querySelector(".input-box span")
const passinput = document.querySelector(".input-box input")
const passindicator = document.querySelector(".pass-indicator")
const generatebtn = document.querySelector(".generate-btn")

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePass = () => {
    let static = "",
        random = "",
        excludeDups = false,
        passlen = sliderlen.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id!== "exc-duplicate" && option.id!=="spaces") {
                static += characters[option.id];
            } else if (option.id==="spaces"){
                static += `  ${static}  `;           
            } else {
                excludeDups = true;
            }
        }
    });

    for (let i = 0; i < passlen; i++) {
        let randomChar = static[Math.floor(Math.random()*static.length)];
        if (excludeDups){
            !random.includes(randomChar) || randomChar == " " ? random += randomChar : i--;
        } else {
            random += randomChar;
        }
    }
    passinput.value = random
}

const updatePass = () => {
    passindicator.id = sliderlen.value <= 8 ? "weak" : sliderlen.value <= 16 ? "medium" :"strong";
}

const updateslide = () => {
    document.querySelector(".pass-length span").innerText = sliderlen.value;
    generatePass();
    updatePass();
}

updateslide();

const copyPass = () => {
    navigator.clipboard.writeText (passinput.value);
    copybtn.innerText = "check";
    copybtn.style.color = "#4285f4";
    setTimeout(() => {
        copybtn.innerText = "copy_all";
        copybtn.style.color = "#707070";
    }, 1500);
}

copybtn.addEventListener("click", copyPass);
sliderlen.addEventListener("input",updateslide);
generatebtn.addEventListener("click",generatePass);