"use strict";
import Services from "./modules/service.js";
import University from "./modules/university.js";
import config from "./modules/config.js";

(function () {
    let objLoader = null;
    let compteurHtml = null;
    let dataUniversity = null;
    let dataUniversityFilter = null;
    let searchStringClampedEnd = false;

    document.querySelector('select').addEventListener('change', event => {
        objLoader = document.querySelector("#loader");
        if (event.target.value != "all") {
            objLoader.style.display = 'block';
            getApiCountry(event.target.value.toLowerCase());
        } else {
            resetSectionResultat();
        }
        searchStringClampedEnd = false;
        if (document.querySelector('input')) {
            document.querySelector('input').remove();
            compteurHtml.remove();
        }
    });


    /**
     * @param {String} itemCountrySearch
     */
    const getApiCountry = async (itemCountrySearch) => {
        dataUniversity = await Services.getDataCountry(itemCountrySearch);
        dataUniversityFilter = new University(dataUniversity.filterList())
        writeFieldSearch(dataUniversity);
        updateCompteur(dataUniversity)
        if (dataUniversity.viewResult()) {
            writeResultListUniversity(dataUniversityFilter);
        }
    };

    /**
     * @param {University} dataObject
     */
    const updateCompteur = (dataObject) => {
        if (compteurHtml) {
            compteurHtml.remove();
        }
        compteurHtml = createElementDom('div', document.querySelector('.search'), (dataObject.data.length > 0) ? `Résultat: ${dataObject.data.length}` : 'Aucun résultat pour votre recherche');
    }

    const resetSectionResultat = () => {
        let sectionResultat = document.querySelector('.section-resultat');
        if (sectionResultat) {
            sectionResultat.remove();
        }
    }

    /**
     * @param {University} dataUniversity
     */
    const writeResultListUniversity = (dataUniversity) => {

        console.log(dataUniversity);
        resetSectionResultat();
        let sectionResultat = createElementDom('section', document.body, null, [{
            name: 'class',
            value: 'section-resultat'
        }]);
        dataUniversity.getSortData().forEach(function (university, index) {
            //university.web_pages = undefined;

            let cardSection = createElementDom('section', sectionResultat);
            let divCardSection = createElementDom('div', cardSection, null, [{
                name: 'class',
                value: `university${index}`
            }]);
            let h4CardSection = createElementDom('h4', divCardSection, (index + 1) + ' - ' + university.name);
            let p1CardSection = createElementDom('div', divCardSection, university.alpha_two_code+' - '+university.country);
            let p2CardSection = createElementDom('div', divCardSection, 'site internet: ');
            let aCardSection = createElementDom('a', divCardSection, university.web_pages[0], [{
                name: 'href',
                value: university.web_pages[0]
            }, {
                name: 'target',
                value: '_blank'
            }]);


        });
        updateCompteur(dataUniversityFilter)
    }
    /**
     * creation object dans le dom
     * @param {String} elementDomName
     * @param {HTMLElement} parent
     * @param {String} text => Texte que l'on souhaite afficher dans l'elementDom généré
     * @param {Object} attributes => liste des attributs que l'on souhaite ajouter à l'elementDom, par défaut à null
     *          [
     *          {string} name => nom de l'attribut
     *          {string} value => valeur de l'attribut
     *         ]     *
     * @returns HTMLElement
     */
    const createElementDom = (elementDomName, parent, text = null, attributes = null) => {
        const elementDom = document.createElement(elementDomName);
        if (text != null) {
            elementDom.textContent = text;
        }
        parent.appendChild(elementDom);
        if (attributes != null) {
            attributes.forEach(attribute => {
                elementDom.setAttribute(attribute['name'], attribute['value']);
            });
        }
        return elementDom;
    }

    /**
     * @param {University} dataUniversity
     */
    const writeFieldSearch = (dataUniversity) => {
        resetSectionResultat();
        updateCompteur(dataUniversity);
        let objDomInputSearch = document.querySelector('input')
        objLoader.setAttribute('style', '')
        if (!objDomInputSearch) {
            let fieldSearch = createElementDom('input', document.querySelector('section'), null, [{
                name: 'placeHolder',
                value: 'Affiner votre recherche'
            }]);
            fieldSearch.addEventListener('keyup', (event) => {
                manageFiterView(event);
            });
        } else {
            objDomInputSearch.value = '';
        }
    }

    /**
     * @param {Event} event
     */
    const manageFiterView = (event) => {
        if (event.target.value.length > config.searchStringClamped || searchStringClampedEnd) {
            searchStringClampedEnd = true;
            dataUniversityFilter = new University(dataUniversity.filterList(event.target.value))
            if (dataUniversityFilter.viewResult()) {
                writeResultListUniversity(dataUniversityFilter);
            } else {
                resetSectionResultat();
                updateCompteur(dataUniversityFilter);
            }
        }
    }
})();