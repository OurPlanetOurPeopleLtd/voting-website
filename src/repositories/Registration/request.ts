import {generateRegistrationPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapRegistration} from "./mappings";
import {TRegistrationPage} from "./model";

export const getRegistrationPage = (slug:string, locale:string, staticData:boolean = true) => {
    const query = generateRegistrationPageQuery( locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then( mapRegistration);

    return getStaticOrFetch<TRegistrationPage>("Registration", apiPromise, locale, slug);
};