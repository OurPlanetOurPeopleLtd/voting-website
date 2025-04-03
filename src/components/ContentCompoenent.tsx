const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    frame: {
      position: 'relative', // TS will now recognize this correctly
      width: '50%',
    },
    frameContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      fontSize: '1.85rem',
    },
    subheading: {
      fontSize: '2rem',
      marginBlock: '1rem',
      marginTop: '1rem',
    },
    textBlock: {
      fontSize: '1rem',
    },
    rightPanel: {
      width: '55%',
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
    primaryCard: {
      backgroundColor: 'var(--tertiary)',
      color: 'white',
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
  
  const ContentComponent = () => {
    return (
      <div style={styles.container}>
        <div style={styles.frame}>
          <div style={styles.frameContent}>
            <h1 style={styles.heading}>What's going wrong?</h1>
            <div style={styles.textBlock}>
              <p>We face inescapable disaster within 20 years because of three huge mistakes...</p>
              <h2 style={styles.subheading}>Preventing disaster happening</h2>
              <p>There are three steps that also interrelate and magnify each other:</p>
            </div>
          </div>
        </div>
        <div style={styles.rightPanel}>
          <img src="https://www.datocms-assets.com/136385/1742397413-thumbnail_leftside.png" alt="" style={styles.image} />
          <h2>Getting involved</h2>
          <div style={styles.gridContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Understanding the Problem</h3>
              <p>A 15-minute video that shows how key climate factors interrelate...</p>
            </div>
            <div style={{ ...styles.card, ...styles.primaryCard }}>
              <h3 style={styles.cardTitle}>Joining the Foundation</h3>
              <p>A link to the page for supporting the project.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Understanding the Solution</h3>
              <p>A 5-minute video explaining the need for investigation backed by documents.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Voting and Sharing</h3>
              <p>A link to vote for identifying the realistic worst case and sharing it.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Understanding the Foundation’s Role</h3>
              <p>A 5-minute video explaining the role of the Foundation in the project.</p>
            </div>
            <div style={{ ...styles.card, display: 'flex', flexDirection: 'column' }}>
              <h3 style={styles.cardTitle}>Donating</h3>
              <p>A link to the ‘Why Donate’ crowdfunding platform.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContentComponent;