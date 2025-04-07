import { TVideoThumbnail } from "../repositories/Common/types";
import { VotingPageData } from "../repositories/VotingPage/types";
import "./HubPage.scss";
import { VideoControl } from "./VideoControl";

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
    },
    frame: {
        position: 'relative',
        width: '50%',
    },
    frameContent: {
        backgroundColor: 'var(--tertiary)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        padding: '1.5rem',
    },
    heading: {
        fontSize: '1.85rem',
        marginBottom: '1.5rem',
    },
    subheading: {
        fontSize: '1.85rem',
        marginBlock: '1rem',
        marginTop: '1rem',
        fontWeight: 600,
    },
    textBlock: {
        fontSize: '1rem',
    },
    rightPanel: {
        width: '55%',
        color: 'var(--tertiary)',
    },
    image: {
        paddingTop: 0,
        padding: 0,
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    card: {
        borderRadius: '12px',
        backgroundColor: 'gainsboro',
        padding: '1rem',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    },
    cardTitle: {
        fontSize: '1.3rem',
        fontWeight: 600,
    },
    icon: {
        width: '30px',
        float: 'right',
        marginTop: 'auto',
        marginLeft: 'auto',
    },
};

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
        <div style={styles.container}>
            <div style={styles.frame}>
                <div style={styles.frameContent}>
                    <h1 style={styles.heading}>{props.heading}</h1>

                    <div style={styles.textBlock}>
                        <div dangerouslySetInnerHTML={{__html: props.introText}}></div>

                        <h2 style={styles.subheading}>{props.subheading}</h2>
                        <div dangerouslySetInnerHTML={{__html: props.secondaryText}}></div>
                    </div>
                </div>
            </div>

            <div style={styles.rightPanel}>
                <VideoControl fullScreenOnClick={true}
                                datoVideo={ props.hubvideo.video.video }
                                videoThumbnail={ props.hubvideo.thumbnailImage.responsiveImage.src } />

                <h2 className="content-heading">{props.hubLinksHeading}</h2>

                <div style={styles.gridContainer}>
                    {props.panelLink.map((link) => (
                        <a key={link.id} href={`/${link.linkDestination.slug}${link.linkDestination.stage ? '?stage=' + link.linkDestination.stage : ''}`} className="hub-card-link" style={styles.card}>
                            <h3 style={styles.cardTitle}>{link.linkTitle}</h3>
                            <p>{link.linkDescription}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
