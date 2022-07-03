import config from "./config.js";

/**
 * Création object University
 * @param {object} objUniversity
 * @returns object University
 */
class University {
    constructor(objUniversity) {
        this.data = objUniversity;
    }
}

/**
 * Permet de filtrer l'objet par rapport à une chaîne de caractère
 * @param {String} query
 * @returns Object
 */
University.prototype.filterList = function (query = '') {
    return this.data.filter(data => data.name.toLowerCase().search(query.toLowerCase()) !== -1);
}

/**
 * Permet de savoir si on affiche un résultat
 * @returns boolean
 */
University.prototype.viewResult = function () {
    return this.data.length <= config.minmunResultatSearch;
}

/**
 * permet de trier les données dans l'ordre alphabétique sur le champ name
 * @returns object
 */
University.prototype.getSortData = function () {
    return this.data.sort((a, b) => (a.name.localeCompare(b.name)) ? 1 : ((b.name.localeCompare(a.name)) ? -1 : 0))
}

export default University;