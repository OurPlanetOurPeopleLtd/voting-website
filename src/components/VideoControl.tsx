import React, { useEffect, useState } from "react";
import { Video } from "react-datocms/dist/types/VideoPlayer";
import { VideoPlayer } from "react-datocms";
import { getUserGuid } from "../repositories/utils/utilities";
import { recordUse } from "../utils/analytics";

import "./VideoControl.scss"

// Define the props type for VideoControl component
export type TVideoProps = {
    isOpen?: boolean, // If false, modal/dialog is closed
    onFinish?: () => void, // Callback when video finishes
    onPause?: () => void, // Callback when video pauses
    onPlay?: () => void, // Callback when video plays
    onProgress?: (time: number) => void, // Callback for video progress update
    datoVideo: Video | undefined, // Video data object from DatoCMS
    videoThumbnail?: string, // URL to video thumbnail/poster image
    pageTitle?: string, // Optional page title (not used here)
    videoTitle?: string, // Optional video title (not used here)
    fullScreenOnClick: true | false | "force", // Control fullscreen behavior on play
    locale?: string, // Language locale string, potentially for subtitles
    autoPlay?: boolean, // Whether video should autoplay on load
    leftShift?: number // Left shift offset if needed (not used here)
}

// Interface describing the mux-player methods we use
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
    isOpen,
    onFinish,
    onPlay,
    onPause,
    onProgress,
    datoVideo,
    videoThumbnail,
    fullScreenOnClick,
    locale,
    autoPlay = false,
    leftShift
}: TVideoProps) => {

    // State to track if we should trigger fullscreen on next play event
    const [goFullScreenOnClick, setGoFullScreenOnClick] = useState(fullScreenOnClick);

    // State to track if video is currently playing or paused
    // This helps us decide whether to pause when modal/dialog closes
    const [playing, setPlaying] = useState(false);

    // Effect to watch for modal/dialog close:
    // If `isOpen` changes to false AND video is playing, force pause the video.
    useEffect(() => {
        if (!isOpen && playing) {
            // Pause video if dialog closes while playing
            forcePause();
            setPlaying(false); // Update playing state as paused now
        }
    }, [isOpen, playing]);

    // Function to request fullscreen on the mux player element
    function goFullScreen() {
        const player = document.querySelector("mux-player");
        const videoElement = player as unknown as MuxPlayer;

        // Only force fullscreen if prop is exactly "force"
        if (fullScreenOnClick !== "force") return;

        if (!videoElement) {
            return;
        }

        // Request fullscreen using standard or vendor-prefixed methods
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();
        }
    }

    // Track last reported time for progress analytics
    let lastReportedTime = -5;

    // Handler for video time update events
    const onVideoProgress = (event: any) => {
        const currentTime = Math.floor(event.target.currentTime);
        const duration = event.target.duration;
        const percentage = duration ? Math.floor((currentTime / duration) * 100) : undefined;

        if (onProgress)
            onProgress(event.target.currentTime);

        // Record analytics every 5 seconds of video watched
        if (currentTime % 5 === 0 && currentTime !== lastReportedTime) {
            lastReportedTime = currentTime;

            recordUse({
                name: "Video_Watched_Time",
                attributes: {
                    page: window.location.pathname,
                    userGuid: getUserGuid(),
                    video: datoVideo?.title ?? "",
                    time: currentTime.toString(),
                    percentage: percentage?.toString() ?? "",
                },
            });
        }
    };

    // Handler when video starts playing
    const onVideoPlay = (event: any) => {
        setPlaying(true); // Update playing state

        if (goFullScreenOnClick) {
            goFullScreen();
            setGoFullScreenOnClick(false);
        }

        if (onPlay)
            onPlay();

        recordUse({
            name: "Video_Played",
            attributes: {
                page: window.location.pathname,
                userGuid: getUserGuid(),
                video: datoVideo?.title ?? "",
                time: event.target.currentTime
            }
        });
    };

    // Handler when video finishes playing
    const onVideoEnd = (event: any) => {
        if (onFinish)
            onFinish();

        recordUse({
            name: "Video_Watched_To_End",
            attributes: {
                page: window.location.pathname,
                userGuid: getUserGuid(),
                video: datoVideo?.title ?? "",
                time: event.target.currentTime,
                percentage: "100",
            }
        });
    };

    // Handler when video pauses
    const onVideoPause = (event: any) => {
        setPlaying(false); // Update playing state

        if (onPause)
            onPause();

        const currentTime = Math.floor(event.target.currentTime);
        const duration = event.target.duration;
        const percentage = duration ? Math.floor((currentTime / duration) * 100) : undefined;

        recordUse({
            name: "Video_Paused",
            attributes: {
                page: window.location.pathname,
                userGuid: getUserGuid(),
                video: datoVideo?.title ?? "",
                time: event.target.currentTime,
                percentage: percentage?.toString() ?? "",
            }
        });
    };

    // Helper function to forcibly pause the video player element
    const forcePause = () => {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer;

        if (videoPlayer) {
            videoPlayer.pause();
        }
    };

    // Helper function to forcibly play the video player element
    const forcePlay = () => {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer;

        if (videoPlayer) {
            videoPlayer.play();
        }
    };

    // Locale related effect - placeholder for subtitles handling (commented out)
    useEffect(() => {
        if (!locale)
            return;

        // Poll for mux-video inside shadow root to update src or subtitles if needed
        const intervalId = setInterval(() => {
            interface VideoPlayerType extends HTMLElement { src: string }
            const videoParent = document.querySelector("mux-player") as HTMLElement;

            // Recursively search for mux-video inside shadow DOM
            function findElementInShadowRoot(root: HTMLElement, selector: string): HTMLElement | null {
                const element = root.querySelector(selector) as HTMLElement;
                if (element) {
                    return element;
                }

                if (root.shadowRoot) {
                    return findElementInShadowRoot(root.shadowRoot as unknown as HTMLElement, selector);
                }

                return null;
            }

            const videoPlayer = findElementInShadowRoot(videoParent, "mux-video") as VideoPlayerType;
            if (!videoPlayer)
                return;

            // Potential code to update videoPlayer.src with locale params
            // videoPlayer.src += `&default_subtitles_lang=${locale}`;

            clearInterval(intervalId); // Stop polling when element is found
        }, 500); // Poll every 500ms

        return () => clearInterval(intervalId); // Clean up on unmount
    }, [locale]);

    // Render the video player and overlay
    return (
        <div id="dato-video-player">
            {/* Overlay that pauses video on click */}
            <div className="video-overlay" onClick={forcePause}></div>
            <div className="video-frame"></div>

            {/* DatoCMS VideoPlayer component */}
            <VideoPlayer
                thumbnailTime={0}
                poster={videoThumbnail}
                autoPlay={autoPlay}
                onEnded={onVideoEnd}
                onPlay={onVideoPlay}
                onTimeUpdate={onVideoProgress}
                onPause={onVideoPause}
                accentColor="#57b3d9"
                data={datoVideo}
            />
        </div>
    );
};
