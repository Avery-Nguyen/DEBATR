import React from 'react';
import './waitingRoom.css';

export default function WaitingRoom() {
 
  return (
    // Need to fix CSS colors
            
              <div style={{
                      backgroundColor: "white", 
                      width: "100%",
                      display: "flex", 
                      justifyContent: "center",
                      marginTop: "75px",
                    }}>
                  <a >
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <span style={{background: "rgb(216,81,182)"}}></span>
                      <p style={{color: "rgb(216,81,182)"}}>Waiting for opponent</p>
                  </a>
              </div>
  );
}