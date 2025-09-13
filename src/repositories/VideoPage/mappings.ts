import {QueryResult, VideoItem} from "./types";


import {TVideoPage} from "./model";
import {TVideoThumbnail} from "../Common/types";


export async function mapVideoData(result: QueryResult): Promise<TVideoPage> {

    const actualPost = result?.data?.allVideoPageModels?.shift() as VideoItem;

    if (!actualPost) {
        throw new Error("no video data");
    }
    var mainVideo: TVideoThumbnail | undefined= actualPost.mainVideo ? actualPost.mainVideo[0] : undefined;
    return {
        header: actualPost.title,
        introText: actualPost.introText,
        videoTitle: mainVideo?.video?.video?.title ?? undefined,
        mainVideo: mainVideo,

   
    };
}