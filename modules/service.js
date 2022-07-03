import config from "./config.js";
import University from "./university.js";

/**
 * Promess rappelle l'API country, passer le paramètre string country
 * @param {String} itemCountrySearch
 * @returns promess object University
 */
class Services {
    static async getDataCountry(itemCountrySearch) {
        return fetch(config.urlApiCountry + '' + itemCountrySearch)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(data => {
                return new University(data);
                ;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default Services;