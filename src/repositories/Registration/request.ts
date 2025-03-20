import {generateRegistrationPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapRegistration} from "./mappings";

export const getRegistrationPage = (locale:string) => {
    const query = generateRegistrationPageQuery( locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapRegistration(root);
    });
};