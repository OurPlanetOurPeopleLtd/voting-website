import React, {useEffect, useState} from "react";
import "./VideoControl.scss"
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";
import {getUserGuid} from "../repositories/utils/utilities";
import {recordUse} from "../utils/analytics";

export type TVideoProps = {
    onFinish?: () => void,
    onPause?: () => void,
    onPlay?: () => void,
    onProgress?: (time:number) => void,
    datoVideo: Video | undefined,
    videoThumbnail?: string,
    pageTitle?: string,
    videoTitle?: string,
    fullScreenOnClick: true | false | "force",
    locale?: string,
    autoPlay?: boolean,
    leftShift?:number
}

interface MuxPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    seek(time: number): void;
    getDuration(): number;
    getCurrentTime(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unmute(): void;
    isMuted(): boolean;
    requestFullscreen(): void;
    exitFullscreen(): void;
    webkitRequestFullscreen(): void;
    msRequestFullscreen(): void;
}

export const VideoControl = ({
                                 onFinish,
                                 onPlay,
                                 onPause,
                                 onProgress,
                                 datoVideo,
                                 videoThumbnail,
                                 fullScreenOnClick,
                                 locale,
                                 autoPlay = false
                             }: TVideoProps) => {

    const [goFullScreenOnClick, setGoFullScreenOnClick] = useState(fullScreenOnClick)

    // Function to toggle fullscreen
    function goFullScreen() {
        const player = document.querySelector("mux-player");
        const videoElement = player as unknown as MuxPlayer;
        if(fullScreenOnClick != "force") return;
        if(!videoElement)
        {
            return; 
        }
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();

        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();

        }
    }

    let lastReportedTime = -5;
    const onVideoProgress = (event: any) => {
        const currentTime = Math.floor(event.target.currentTime);
        const duration = event.target.duration;
        const percentage = duration ?  Math.floor((currentTime / duration) * 100) : undefined;

        if(onProgress)
            onProgress(event.target.currentTime);
        
        //record every 5 seconds of video watched
        if (currentTime % 5 === 0 && currentTime !== lastReportedTime) {
            lastReportedTime = currentTime;

            // Your recordUse function here
            recordUse({
                name: "Video_Watched_Time",
                attributes: {
                    page: window.location.pathname,
                    userGuid: getUserGuid(),
                    video: datoVideo?.title ?? "",
                    time: currentTime.toString(),
                    percentage:percentage?.toString() ?? "",
                },
            });
        }
    };
    const onVideoPlay = (event: any) =>
    {       
       
        if(goFullScreenOnClick) {
            goFullScreen();     
            setGoFullScreenOnClick(false);
        }        
        
        if(onPlay)
            onPlay();

        recordUse({name: "Video_Played", attributes: {page: window.location.pathname, userGuid:getUserGuid(), video:datoVideo?.title ??"", time:event.target.currentTime}});

    }
    const onVideoEnd = (event: any) =>
    {        
        if(onFinish)
            onFinish();

        recordUse({name: "Video_Watched_To_End", attributes: {page: window.location.pathname, userGuid:getUserGuid(), video:datoVideo?.title ??"", time:event.target.currentTime}});

    }

    const onVideoPause = (event: any) =>
    {
        if(onPause)
            onPause();    
        recordUse({name: "Video_Paused", attributes: {page: window.location.pathname, userGuid:getUserGuid(), video:datoVideo?.title ??"", time:event.target.currentTime}});
        
    }
    const forcePause  = () =>
    {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer

        videoPlayer.pause();
    }

    const forcePlay  = () =>
    {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer

        videoPlayer.play();
    }
    
   if(datoVideo)
    {
        datoVideo["default_subtitles_lang"] = locale;
        datoVideo["defaultsubtitles"]=locale;
    }
    useEffect(() => {
        
       // videoPlayer.replaceWith(newVideoPlayer)
        
    }, []);



    function findElementInShadowRoot(root:HTMLElement, selector:string): HTMLElement | null {
        const element = root.querySelector(selector) as HTMLElement;
        if (element) {
            return element;
        }

        if (root.shadowRoot) {
            return findElementInShadowRoot(root.shadowRoot as unknown as HTMLElement, selector);
        }

        return null;
    }
    
    useEffect(() => {
        if(!locale)
            return;
        
        const intervalId = setInterval(() => {
            
            interface VideoPlayerType extends HTMLElement{src:string}
            const videoParent = document.querySelector("mux-player") as HTMLElement;
            const videoPlayer = findElementInShadowRoot(videoParent, "mux-video") as VideoPlayerType;
            if(!videoPlayer)
                return;
                            
            videoPlayer.src += `&default_subtitles_lang=${locale}`;
            //forcePause();
            clearInterval(intervalId); // Stop polling when element is found            
        }, 500); // Adjust polling interval as needed

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    //forcePause();

    
    return (<div id="dato-video-player">
        <div className="video-overlay"onClick={forcePause}></div>
        <div className="video-frame" ></div>

         <VideoPlayer
              
                thumbnailTime={0}
                poster={videoThumbnail}
                autoPlay={autoPlay}
                onEnded={onVideoEnd}
                onPlay={onVideoPlay}
                onTimeUpdate={onVideoProgress}
                onPause={onVideoPause}
                accentColor="#57b3d9"
                data={datoVideo}></VideoPlayer>

    </div>)
}