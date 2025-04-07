import "./HubPage.scss";

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
  
export const HubComponent = () => {
    return (
        <div style={styles.container}>
            <div style={styles.frame}>
                <div style={styles.frameContent}>
                    <h1 style={styles.heading}>What's going wrong?</h1>

                    <div style={styles.textBlock}>
                        <p>We face inescapable disaster within 20 years because of three huge mistakes that interrelate and magnify each other:</p>

                        <ol>
                            <li><p>Officially everyone must pretend that we are doing well when that is completely untrue.</p></li>

                            <li><p>Scientists don’t get research grants if they don’t go along with this pretence.</p></li>

                            <li><p>Policy makers and the public haven’t been told about the high likelihood of inescapable disaster. So, they don’t support the actions needed to avert disaster.</p></li>
                        </ol>

                        <h2 style={styles.subheading}>Preventing disaster happening</h2>
                        <p>There are three steps that also interrelate and magnify each other:</p>

                        <ol>
                            <li><p>The peoples of our planet must insist that the pretence must end. The realistic worst case must be identified and brought out into open.</p></li>

                            <li><p>The top scientists in each of the many areas that interrelate to create the pathway to disaster must identify the realistic worst case. They must complete and publish their work within six months.</p></li>

                            <li><p>The peoples of our planet must direct their respective Governments to take actions that are adequate to avoid the potential disaster that the investigation has revealed.</p></li>
                        </ol>
                    </div>
                </div>
            </div>

            <div style={styles.rightPanel}>
                <img src="https://www.datocms-assets.com/136385/1742397413-thumbnail_leftside.png" alt="" style={styles.image} />

                <h2 className="content-heading">Getting involved</h2>

                <div style={styles.gridContainer}>
                    <a href="#" className="hub-card-link" style={styles.card}>
                        <h3 style={styles.cardTitle}>Understanding the Problem</h3>
                        <p>A 15 minute video that shows how the key climate change factors interrelate to create a pathway leading inexorably to disaster.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>
                    
                    <a href="#" className="hub-card-link" style={ styles.card }>
                        <h3 style={styles.cardTitle}>Joining the Foundation</h3>
                        <p>A link to the page that allows those wishing to actively support the project to become members of the Foundation.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>

                    <a href="#" className="hub-card-link" style={styles.card}>
                        <h3 style={styles.cardTitle}>Understanding the Solution</h3>
                        <p>A 5 minute video that explains the need for investigation backed by 3 documents (16 pages) that provide the scientific means of identifying the realistic worst case.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>

                    <a href="#" className="hub-card-link" style={styles.card}>
                        <h3 style={styles.cardTitle}>Voting and Sharing</h3>
                        <p>A link to the pages that will allow any citizen to vote for (or against) identifying the realistic worst case and to then share the process with family members and friends.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>

                    <a href="#" className="hub-card-link" style={styles.card}>
                        <h3 style={styles.cardTitle}>Understanding the Foundation’s Role</h3>
                        <p>A 5 minute video explaining the role of the Foundation that will own the project and provide a voice for and be answerable to the peoples of our planet.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>

                    <a href="#" className="hub-card-link" style={ styles.card }>
                        <h3 style={styles.cardTitle}>Donating</h3>
                        <p>A link to the ‘Why Donate’ crowdfunding platform to enable those withing to make modest contributions to functioning of the Foundation.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};
