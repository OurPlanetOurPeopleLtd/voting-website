import React from "react";

import {TVideoProps, VideoControl} from "../components/VideoControl";
import "./VideoWithPdfs.scss";
import {TPdfWrapper} from "../repositories/Common/types";
type TPdfs = {pdfWrappers:TPdfWrapper[]}
type TVideoPdfs = TPdfs & TVideoProps;

export const VideoWithPdfs = (props: TVideoPdfs) => {

   
    //if no pdfs just treat as normal control
    if(!props.pdfWrappers || props.pdfWrappers.length === 0){
        return <VideoControl {...props}  />
    }

    function bytesToKilobytesString(bytes: number): string {
        const kilobytes = Math.floor(bytes / 1024);
        return kilobytes.toString() + "kb";
    }
    
    return (
        <div className="video-reference-container">
            <div className="video-container">
                <VideoControl {...props}  />
            </div>

            <div className="reference-container">
                <ul>
                {props.pdfWrappers.map((pdfWrapper, index) =>
                    <li key={"list_"+index}>                                   
                        <a href={pdfWrapper.pdf.url}>
                        <img src={pdfWrapper.thumbnail.responsiveImage.src}/>
                        </a>
                        <p>{bytesToKilobytesString(pdfWrapper.pdf?.size)}</p>
                        <p> {pdfWrapper.description}</p>
                        
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}