const fText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const tags = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const trbtn = document.querySelector("button");


tags.forEach((tag,id) => {
    for (let language in languages) {
        let seleceted = id == 0 ? language == "en-GB" ? "selected" : "" : language == "de-DE" ? "selected" :"";
        let option = `<option ${seleceted} value ="${language}"> ${languages[language]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});

exchange.addEventListener("click", () => {
    let tempText = fText.value,
        tempLang = tags[0].value;
    fText.value = toText.value;
    toText.value=tempText;
    tags[0].value=tags[1].value;
    tags[1].value=tempLang;
});

fText.addEventListener("keyup", ()=> {
    if (!fText.value) {
        toText.value ="";
    }
});

trbtn.addEventListener("click", () => {
    let text = fText.value.trim(),
        translateFrom=tags[0].value,
        translateTo=tags[1].value;
    if (!text) return;

    toText.setAttribute("placehoder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value=data.responseData.translatedText;
        data.matches.forEach(data => {
            if (data.id===0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder","Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fText.value || !toText.value) return;
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else if (target.classList.contains("fa-volume-up")) {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fText.value);
                utterance.lang = tags[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = tags[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
