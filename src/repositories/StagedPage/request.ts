import {generateSpecialPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapSpecialPage} from "./mappings";


export const getSpecialPageJson = (slug: string, locale:string) => {
    const query = generateSpecialPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapSpecialPage(root);
    });
};

