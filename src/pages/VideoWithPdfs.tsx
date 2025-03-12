import React from "react";

import {TVideoProps, VideoControl} from "../components/VideoControl";


import "./VideoWithPdfs.scss";
import {TPdfWrapper} from "../repositories/Navigation/types";
import {HubCard} from "../components/HubCollection";

type TPdfs = {pdfWrappers:TPdfWrapper[]}
type TVideoPdfs = TPdfs & TVideoProps;

export const VideoWithPdfs = (props: TVideoPdfs) => {

   

    //if no pdfs just treat as normal control
    if(!props.pdfWrappers || props.pdfWrappers.length === 0){
        return <VideoControl {...props}  />
    }
    
    return (
        <div className="video-reference-container">
            <div className="video-container">
                <VideoControl {...props}  />
            </div>

            <div className="reference-container">
                <ul>
                {props.pdfWrappers.map((pdfWrapper, index) => 
                    <li>
                        {/* feel free to use pure html with the same data*/}
                        <HubCard pageImageSrc={pdfWrapper.thumbnail.responsiveImage.src} 
                                 pageTitle={pdfWrapper.title} 
                                 link={pdfWrapper.pdf.url}
                                 uniqueKey={pdfWrapper.title + index}/>                            
                        
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}