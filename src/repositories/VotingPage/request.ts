
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import { mapVotingPage} from "./mappings";
import {generateVotingPageQuery} from "./query";
import {LogQuery} from "../utils/utilities";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";

export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.VotingPage).map( x=> x.slug);
}

export const getVotingPageJson = (slug: string, locale:string) => {
    const query = generateVotingPageQuery(slug, locale);

    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVotingPage(root);
    });
};

