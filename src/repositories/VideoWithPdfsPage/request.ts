import { generateVideoWithPdfPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoWithPdfData} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.VideoWithPdfs).map( x=> x.slug);
}

export const getVideoWithPdfPageJson = (slug: string, locale:string) => {
    const query = generateVideoWithPdfPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVideoWithPdfData(root);
    });
};

