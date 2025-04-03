import {generateVideoPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoData} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";

export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.VideoPage).map( x=> x.slug);
}

export const getVideoPageJson = (slug: string, locale:string) => {
    const query = generateVideoPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVideoData(root);
    });
};

