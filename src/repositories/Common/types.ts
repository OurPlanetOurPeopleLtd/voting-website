import {NavigationItem} from "../Navigation/types";
import {Video} from "react-datocms/dist/types/VideoPlayer";

export interface QueryResult {
    data: Data
    errors: {}
}

export interface TVideoThumbnail {
    thumbnailImage: {responsiveImage: {src: string}};
    video: { id: string, video: Video };
}
export interface Data {
    allVideoPageModels: NavigationItem[]
    allBlogPostModels: NavigationItem[];
    allVideoWithPdfs: NavigationItem[];
    votingPageModel: NavigationItem;
}

export type TArticlePage = {
    slug: string;
    title?: string;
    locale: string;
};
export interface Sys {
    id: string
}

export type TPdfWrapper =
    {
        title: string;
        description: string;
        createdDate?:Date;
        thumbnail: { responsiveImage: { src: string } };
        pdf:{url:string, size:number, _createdAt:string}
    }
