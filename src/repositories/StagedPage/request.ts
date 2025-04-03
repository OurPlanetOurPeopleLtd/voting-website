import {generateSpecialPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapSpecialPage} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.SpecialPageRecord).map( x=> x.slug);
}

export const getSpecialPageJson = (slug: string, locale:string) => {
    const query = generateSpecialPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapSpecialPage(root);
    });
};

