import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateVideoPageQuery(slug: string, locale:string) {
    
    const query = `query videoPageCollectionQuery {
  allVideoPageModels(first: 1, filter: {slug: {eq:"${slug}"}} , locale:${locale} fallbackLocales:[en]) 
  {
    
      
       id      
      __typename
      ${QueryBlocks.VideoPost}
    
  }
}`

    LogQuery(query);

    return query;
}
