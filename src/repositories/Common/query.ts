//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U

import {ContentTypes} from "../Navigation/types";

const blogPost = `title
            slug`;



const videoBlock = `{
                   id,
                   video {
                    muxPlaybackId
                    title
                    width
                    height
                    blurUpThumb
                  }
              }`

const imgBlock = `{responsiveImage
        {src}}`;

const pdfWrapperBlock = `{
            title
            description
               id 
               thumbnail${imgBlock}
               pdf
                {
                  url
                  size
                  _createdAt
                }
          }`


const videoPage = `
                id
                slug
                title
                mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
                }    
            `;
const videoWithPdfPage = videoPage + ` 
            followOnLink {      
            url
          }
            pdfs
             ${pdfWrapperBlock}`;
    
const questionBlock = `
    id,
    questionTitleSt{  
        value
        }
        voteForText
        voteAgainstText
        textBelowVoting
    `
const votingPage = ` 
            id
            cardTitle,  
            showVoteStatistics,
     
            landingVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             detailVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             thankYouVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
            
            
             proposition1{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             proposition2{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             proposition3{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
            
            openingText{value},
            shareHeading,
            shareSubheading,
            donateText{value},
            slug,
            questions {
                ... on QuestionRecord { 
                 ${questionBlock}
                 }
            }
            postThankYou${videoBlock}
            postVoteVideo${videoBlock}
            mainVideo${videoBlock}`;




    
const basicNavItems = `
          __typename
          
          ... on ${ContentTypes.PdfWrapper} ${pdfWrapperBlock}
          ... on ${ContentTypes.VideoWithPdfs} {
            title
            slug
            pdfs
             ${pdfWrapperBlock}
             mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}}
                
          }
 
          ... on VideoPageModelRecord {
            title
               id 
               slug
               mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}}
          }
          ... on BlogPostModelRecord {
             title
            slug
            id
          }
              
          ... on VotingPageModelRecord{
            cardTitle
            id
          }
          
          ... on InformationSourceRecord{
          title
            video
            {
              ... on VideoPageModelRecord {
                  slug
                  }
                }
            pdf
            {
              url
            }
          }
          
          `

export const QueryBlocks =
    {
        BasicNavigationItems: basicNavItems,
        BlogPost: blogPost,
        VideoWithPdfPage: videoWithPdfPage,
        VideoPost: videoPage,
        VotingPage: votingPage,
        VideoComponent: videoPage,
    }

