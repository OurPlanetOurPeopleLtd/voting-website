import {mapBlogData, mapBlogPost} from "./mappings";
import {QueryResult} from "./types";
import {generatePostQuery, generatePostQueryPaginated} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.BlogPost).map( x=> x.slug);  
}

export const getPageJson = (slug: string, locale: string) => {
    const query = generatePostQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapBlogData(root,locale); //todo handle failure outside of function
    });
};