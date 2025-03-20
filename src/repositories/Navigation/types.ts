import {Video} from "react-datocms/dist/types/VideoPlayer";
import {StructuredTextDocument} from "react-datocms";
import {TPdfWrapper, TVideoThumbnail} from "../Common/types";


export interface QueryResult {
    data: Data
    errors: {}
}

export interface Data {
    allNavigationGroupModels: NavigationItem[]
}

export interface NavigationGroup {
    navigationItem: NavigationItem[]
}

export enum ContentTypes {
    RegistrationPage = "RegistrationPageRecord",
    VotingPage = "VotingPageModelRecord",
    BlogPost = "BlogPostModelRecord",
    VideoPage = "VideoPageModelRecord",
    NavigationGroup = "NavigationGroupModelRecord",
    ExternalLink = "ExternalLinkModelRecord",
    VotingResult = "VotingResultModelRecord",
    PdfAndVideo = "InformationSourceRecord",
    PdfWrapper = "PdfWrapperModelRecord",
    VideoWithPdfs = "VideoWithPdfRecord"
}

export enum AssetTypes {
    YoutubeVideoEmbed = "YoutubeVideoEmbed",
    GenericImage = "GenericImage",
}

export interface BasePage {
    __typename: ContentTypes
    slug: string
    title: string
}

export interface TQuestionBlock {

    id: string,
    questionTitleSt: {value: StructuredTextDocument},
    voteForText: string,
    voteAgainstText: string,
    textBelowVoting: string,
    
}


export interface NavigationItem extends NavigationGroup {

    mainVideo: TVideoThumbnail | undefined;    
    
    cardTitle: string;
    title: string;
    url: string;
    id: string;
    slug: string;
    __typename: ContentTypes
    showVideoThumbnailsInHub?: boolean
    thumbnail: { responsiveImage: { src: string } };
    pdf:{url:string}  
    pdfs:TPdfWrapper[]
    video:{slug:string}
    resultsHeading?: string,
}

