import { TVideoThumbnail } from "../repositories/Common/types";
import { VideoControl } from "./VideoControl";

import "./HubPage.scss";

export interface IHubComponentProps {
    id: string;
    heading: string;
    subheading: string;
    introText: string;
    secondaryText: string;
    hubvideo: TVideoThumbnail;
    hubLinksHeading: string;
    panelLink: {
        id: string;
        linkTitle: string;
        linkDescription: string;
        linkDestination: {
            slug: string;
            stage?: number;
        };
    }[];
}
  
export const HubComponent = (props: IHubComponentProps) => {
    return (
        <div className="hub-container">
            <div className="hub-frame">
                <div className="hub-content">
                    <h1 className="hub-heading">{props.heading}</h1>

                    <div className="hub-text-block">
                        <div dangerouslySetInnerHTML={{__html: props.introText}}></div>

                        <h2 className="hub-subheading">{props.subheading}</h2>
                        <div dangerouslySetInnerHTML={{__html: props.secondaryText}}></div>
                    </div>
                </div>
            </div>

            <div className="hub-panel-right">
                <VideoControl fullScreenOnClick={true}
                                datoVideo={ props.hubvideo.video.video }
                                videoThumbnail={ props.hubvideo.thumbnailImage.responsiveImage.src } />

                <h2 className="content-heading">{props.hubLinksHeading}</h2>

                <div className="hub-links-grid">
                    {props.panelLink.map((link) => (
                        <a key={link.id} href={`/${link.linkDestination.slug}${link.linkDestination.stage ? '?stage=' + link.linkDestination.stage : ''}`} className="hub-card-link">
                            <h3>{link.linkTitle}</h3>
                            <p>{link.linkDescription}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
