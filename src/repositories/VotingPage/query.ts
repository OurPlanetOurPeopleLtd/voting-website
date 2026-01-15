
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

// if we decide to bring variants back, we need this
const useVariants = false;
export function generateVotingPageQuery(id: string, locale:string) {
    
    let variantFilter = id ? `filter: {variant: {eq:"${id}"}}, ` : "";
    if(!useVariants)
    {
        variantFilter = "";
    }
    
    const query = `query videoPageCollectionQuery {
      votingPageModel( ${variantFilter} locale:${locale}, fallbackLocales:[en]) 
      {
        
          
         ${QueryBlocks.VotingPage}
        
      }
    }`

  
    LogQuery(query);

    return query;
}
