import { generateVideoWithPdfPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoWithPdfData} from "./mappings";


export const getVideoWithPdfPageJson = (slug: string, locale:string) => {
    const query = generateVideoWithPdfPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVideoWithPdfData(root);
    });
};

