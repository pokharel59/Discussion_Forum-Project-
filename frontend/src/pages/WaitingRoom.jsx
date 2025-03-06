// pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

// const bgColor = '#83bdff';

function WaitingRoom() {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={styles.panel}>
          {/* top row */}
          <div style={styles.topRow}>
            <h3>DiscussionForum</h3>
            <div style={styles.topRight}>
              <h3>Username</h3>
              <LogoutButton />
            </div>
              
          </div>

          {/* body col */}
          <div style={styles.contentBody}>
            <h1 style={styles.heading}>Waiting Room</h1>

            {/* grey panel */}
            <div style={styles.greyPanel}>
              <div style={styles.greyLeft}>
                  <h3 style={{  fontWeight:'bold', }}>Future of AI Discussion</h3>
                  <h5>Hosted by Abhaya Khatiwada</h5>
                  <h6><i class='bi bi-clock-fill' style={{  marginRight:'10px', }}></i>5 min/turn</h6>
              </div>

              <div style={styles.greyRight}>
                <i class='bi bi-copy' style={{ color:'darkred', fontSize: '20px' }}></i>
                <h6 style={{ color:'darkred' }}>LOBBY123</h6>
              </div>
            </div>

            {/* blue panel */}
            <div style={styles.bluePanel}>
            <h3 style={{  fontWeight:'bold'}}>Participants</h3>
            <div style={styles.participantsDiv}>

              <div style={styles.participant}>
                <h5 style={{fontWeight: 'bold'}}>Aayush</h5>
                <h6 style={{color: '#666',marginTop:'-10px'}}>Ready</h6>
              </div>
              
              <div style={styles.participant}>
                <h5 style={{fontWeight: 'bold'}}>Bishal</h5>
                <h6 style={{color: '#666',marginTop:'-10px'}}>Ready</h6>
              </div>
              <div style={styles.participant}>
                <h5 style={{fontWeight: 'bold'}}>Pramit</h5>
                <h6 style={{color: '#666',marginTop:'-10px'}}>Ready</h6>
              </div>
              <div style={styles.participant}>
                <h5 style={{fontWeight: 'bold'}}>Dev</h5>
                <h6 style={{color: '#666',marginTop:'-10px'}}>Ready</h6>
              </div>
              <div style={styles.participant}>
                <h5 style={{fontWeight: 'bold'}}>Abhaya</h5>
                <h6 style={{color: '#666',marginTop:'-10px'}}>Ready</h6>
              </div>

            </div>

            </div>

            <div style={styles.lastButtons}>
              <Link to='#'>
                <button style={{...styles.button, ...styles.button1}}>Not Ready</button>
              </Link>
              <Link to='#'>
                <button style={styles.button}>Ready to Start</button>
              </Link>
            </div>
          </div> {/* contentBody end */}

        </div> {/* panel end  */}
      </div>
    </div>
  );
};

// styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e2e2e2',
  },
  main: {
    width: '1200px', // Fixed width
    height: '800px', // Fixed height
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  panel: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '30px',
   },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topRight: {
    display: 'flex',
    gap: '30px',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBody: {
    width: '800px',
    height: '600px',
    marginLeft: '100px',
    marginTop: '40px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  greyPanel: {
    backgroundColor: '#d9d9d9',
    height: '180px',
    width: '100%',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    paddingRight: '40px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    overflow: 'hidden',
    
  },
  greyLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    color: '#333',
    marginLeft: '10px',
  },
  greyRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: '30px',
    width: '160px',
  },
         
  bluePanel: {
    boxSizing: 'border-box',
    backgroundColor: '#83bdff',
    padding: '30px',
    height: '320px',
    width: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  participantsDiv: {
    // backgroundColor: 'tan',
    height: '80%',
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '20',
  },
  participant: {
    width: '200px',
    height: '60px',
    paddingTop: '4px',
    backgroundColor: '#ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },




  lastButtons: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '30px',
  },
  button: {
    backgroundColor: '#0099e6',
    color: 'white',
    border: 'none',
    padding: '6px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '20px'
  },
  button1: {
    backgroundColor: '#d2d2d2',
    color: 'black',
  }
 
};

export default WaitingRoom;
