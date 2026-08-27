// ==UserScript==
// @name         Speed Reading
// @namespace    http://tampermonkey.net/
// @version      2026-01-09
// @description  Click paragraph on website while holding ALT to activate speed reeding tool
// @author       You
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const INTERVAL = 145;

    let words = [];
    let current = 0;
    let length = 0;

    let intervalID = null;


    const rect = document.createElement("div");

    rect.style.display = "none";
    rect.style.pointerEvents = "none";

    rect.style.color = "white";
    rect.style.whiteSpace = 'pre';
    rect.style.alignContent = 'center';
    rect.style.textAlign = 'center';
    rect.style.fontFamily = 'monospace';
    rect.style.fontSize = '60px';
    rect.style.borderRadius = "10px";

    rect.style.width = "800px";
    rect.style.height = "300px";


    rect.style.backgroundColor = "#2a2a67";


    rect.style.position = "fixed";
    rect.style.top = "50%";
    rect.style.left = "50%";
    rect.style.transform = "translate(-50%, -50%)";
    rect.style.zIndex = "999999";

    // Optional: prevent clicks from passing through
    // rect.style.pointerEvents = "auto";

    document.body.appendChild(rect);



    document.addEventListener("click", (event) => {
        if (intervalID == null) {
            if (event.altKey) {
                separateWords(event.target.textContent);
                startReading();
            }
        } else {
            clearData();
        }
    })

    function separateWords(text) {
        words = text.split(" ");
        length = 0;
    }

    function startReading() {

        current = 0;
        length = words.length;
        rect.style.display = "block";

        printWord();
        intervalID = setInterval(printWord, INTERVAL);
    }

    function printWord()
    {
        if (current < length) {

            const punctuation = /[\.,-]/g;
            let word = words[current];

            word = word.trim();
            word = word.replace(punctuation, "");
            word = colorMiddleLetter(word);

            rect.innerHTML = word;
            current++;
        }
        else
        {
            clearData();
        }
    }

    function colorMiddleLetter(word)
    {
        if (word == false) return word;

        if (word.length % 2 == 1) {
            word += " ";
        }

        const mid = Math.floor(word.length / 2);

        return (
            word.slice(0, mid) +
            `<span style="color:red;">${word[mid]}</span>` +
            word.slice(mid + 1)
        );
    }

    function clearData()
    {
        clearInterval(intervalID);
        intervalID = null;
        words = [];
        current = 0;
        length = 0;
        rect.style.display = "none";
    }
})();
