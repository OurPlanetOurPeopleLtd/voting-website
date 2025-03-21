import {fetchDataDato} from "../utils/graphQLfetch";
import {allNavigationParts, QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors} from "../utils/utilities";

const getNavBlocks = (locale:string):string =>  allNavigationParts.map(name =>
      ` ${name}(locale:${locale}, fallbackLocales:[en]){
                  __typename
                    id
                    title
                    slug
                  }`
        
    ).join("")



function generateAllPagesForNavQuery(locale:string) {

    return `query navQuery{ 
        ${getNavBlocks(locale)}    
    }`;
}

function mapAllSlugs(root: QueryResult): NavigationItem[] {
    return root?.data?.allVideoPageModels
        .concat(root.data.registrationPage)
        .concat(root.data.allVideoWithPdfs)
        .concat(root.data.allBlogPostModels)
        .concat(root.data.votingPageModel)
        .concat(root.data.allSpecialPages)
        .concat(root.data.votingResult);
}

export const getAllNavData = (locale:string) => {
    const query = generateAllPagesForNavQuery(locale);
    
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {

       
        if (root.errors) {
            console.log(root.errors)
            LogErrors(root.errors)
        }

        return mapAllSlugs(root); //todo handle failure outside of function

    });
};