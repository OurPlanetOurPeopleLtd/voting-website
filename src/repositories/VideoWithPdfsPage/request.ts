import {generateVideoWithPdfPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoWithPdfData} from "./mappings";
import {TVideoWithPdfsPage} from "./model";

export const getVideoWithPdfPageJson = (slug: string, locale:string, staticData:boolean = true) => {
    const query = generateVideoWithPdfPageQuery(slug, locale);
    const apiPromise =  fetchDataDato<QueryResult>(query).then(mapVideoWithPdfData);

    return getStaticOrFetch<TVideoWithPdfsPage>("VideoWithPdfsPage", apiPromise, locale, slug);
};

