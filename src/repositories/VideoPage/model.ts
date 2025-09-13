import {TVideoThumbnail} from "../Common/types";

export type TVideoPage = {
    mainVideo: TVideoThumbnail | undefined,//{ id: string, video:{video: Video | undefined} } | undefined;
    mainVideos?: TVideoThumbnail[] | undefined,
    header: string
    introText?: string;
    videoTitle?: string;
}