import {generateRegistrationPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapRegistration} from "./mappings";
import {getAllItems, getNavigationJson} from "../Navigation/request";
import {ContentType} from "../Navigation/types";

export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.RegistrationPage).map( x=> x.slug);
}

export const getRegistrationPage = (slug:string, locale:string) => {
    const query = generateRegistrationPageQuery( locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapRegistration(root);
    });
};