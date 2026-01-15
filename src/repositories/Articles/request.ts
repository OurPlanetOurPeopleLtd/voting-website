import {mapBlogData,} from "./mappings";
import {QueryResult} from "./types";
import {generatePostQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TPage} from "./model";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.BlogPost).map( x=> x.slug);  
}

export const getPageJson = (slug: string, locale: string) => {
    const query = generatePostQuery(slug, locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapBlogData(root,locale); //todo handle failure outside of function
    });


 
    return getStaticOrFetch<TPage | null>("Articles", apiPromise, locale, slug);
};