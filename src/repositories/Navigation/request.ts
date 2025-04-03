import {ContentType, NavigationItem, QueryResult} from "./types";
import {generateNavQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {mapNavData} from "./mappings";
import {footerComponentId, headerComponentId} from "../utils/config";

export const getNavigationJson = (id: string, locale:string) => {
    const query = generateNavQuery(id,locale);


    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {

        return mapNavData(root);
    });
};

export const getAllSlugs = async () =>
{
    //for navigation slug = id
    return [headerComponentId,footerComponentId];    
}

export const getAllItems = async (): Promise<NavigationItem[]> => {
    const header = await getNavigationJson(headerComponentId, "en");
    const footer = await getNavigationJson(footerComponentId, "en");
    return [...footer,...header];
}