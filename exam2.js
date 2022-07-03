"use strict";

    let listeButton = document.querySelectorAll('button');

    listeButton.forEach((element, index) => {
        document.querySelector('#' + element.id).addEventListener('click', event => {
            eventClickButton(element, index);
        });
    });

    let eventClickButton = function (element) {
        element.style.display = 'none';
        let typeTagInsert = element.id.replace('btn-', '')
        if (typeTagInsert) {
            writeElementHtml({typeTagInsert, element});
        }
    };

    let writeElementHtml = function (parameter) {
        let htmlWriteNewTag = document.createElement(parameter.typeTagInsert)
        htmlWriteNewTag.textContent = parameter.typeTagInsert;
        let targetWriteNewTag = document.querySelector('#' + parameter.element.id);
        targetWriteNewTag.parentNode.insertBefore(htmlWriteNewTag, targetWriteNewTag);
    };
