import {QueryResult, VideoWithPdfItem} from "./types";

import {TPdfWrapper, TVideoThumbnail} from "../Common/types";
import {TVideoWithPdfsPage} from "./model";


export async function mapVideoWithPdfData(result: QueryResult): Promise<TVideoWithPdfsPage> {
    
    const actualPost = result?.data?.allVideoWithPdfs?.shift() as VideoWithPdfItem;

    if (!actualPost) {
        throw new Error("no video data");
    }
    
    function decoratePdfWrapper(original:TPdfWrapper) : TPdfWrapper
    {
        return  {
            ...original,
            createdDate: new Date(original.pdf._createdAt)
        }
    }
    var mainVideo: TVideoThumbnail | undefined= actualPost.mainVideo ? actualPost.mainVideo[0] : undefined;
    
    const data:TVideoWithPdfsPage =  {
        pdfs: actualPost.pdfs.map( decoratePdfWrapper),
        header: actualPost.title,
        introText: actualPost.introText,
        videoTitle: mainVideo?.video?.video?.title ?? undefined,
        mainVideo: mainVideo,
        mainVideos: actualPost.mainVideo,
        followOnLink : actualPost.followOnLink?.url ?? undefined,
    };
  
    return data;
}