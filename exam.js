"use strict";
    window.onload = (event) => {
        writeHtmlParagraphe()
        managePromt();
    };

    let myPromt = null;
    let managePromt = function () {
        let messageQuestion = '"Voulez-vous voir le contenu de cette page (o/n) ?"'
        myPromt = prompt(messageQuestion)
        if (myPromt.toLowerCase() == 'o') {
            document.querySelector('p').style.display = 'block';
        } else {
            managePromt();
        }
    }

    let writeHtmlParagraphe = function () {
        let myParagrapheTag = document.createElement('p');
        myParagrapheTag.style.display = 'none';
        myParagrapheTag.textContent = 'Lorem ipsum dolor lorem Lorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor lorem Lorem ipsum dolor lorem Lorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor lorem Lorem ipsum dolor lorem Lorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor lorem Lorem ipsum dolor lorem Lorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor lorem Lorem ipsum dolor lorem Lorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor loremLorem ipsum dolor lorem ';
        document.body.appendChild(myParagrapheTag);
    }
