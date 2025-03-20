import {fetchDataDato} from "../utils/graphQLfetch";
import {allNavigationParts, QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors} from "../utils/utilities";
import {QueryBlocks} from "./query";

const getNavBlocks = (locale:string):string =>  allNavigationParts.map(name =>
      ` ${name}(locale:${locale}, fallbackLocales:[en]){
                  __typename
                    id
                    title
                    slug
                  }`
        
    ).join("")



function generateAllPagesForNavQuery(locale:string) {
    
    const query = `query navQuery{ 
        ${getNavBlocks(locale)}    
    }`
    

    /*
    const query = `query pageQuery {
      allBlogPostModels(locale:${locale}, fallbackLocales:[en]) {
       __typename   
     
        id
      slug	
  }
  registrationPage{
  __typename
    id
    title
    slug
  }
  votingResult
    {
     __typename
      id
      title
      slug
    }
  allVideoPageModels{
         __typename

      id
      slug	
    
  }
  allVideoWithPdfs{
         __typename
   
      id
      slug
    
  }
  allSpecialPages{
       __typename   
      id
      slug
  }
   
  votingPageModel{
    
    __typename    
  	  slug,
      cardTitle,
  }
}`*/
    return query;
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