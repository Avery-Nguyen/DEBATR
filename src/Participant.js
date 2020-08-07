import React, { useState, useEffect, useRef } from "react";
// import { useStore } from './Store'

const Participant = ({ participant }) => {

    // console.log("Participant -> participant", participant.audioTracks)

  // const [state, dispatch] = useStore();
  const [videoTracks, setVideoTracks] = useState([]);
  console.log("Participant -> videoTracks", videoTracks)
  const [audioTracks, setAudioTracks] = useState([]);
  if(audioTracks[0]){

    console.log("Participant -> audioTracks", audioTracks[0].isEnabled)
  }
  // const [show, setShow] = useState(false)

  const videoRef = useRef();
  console.log("Participant -> videoRef", videoRef)
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        // setShow(true)
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);



    return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      {/* {show ? <video ref={videoRef} autoPlay={true} style={{width: 600, height: 400}}/> : <h4 style={{width: 600, height: 400}}>Wating for Debater</h4>} */}
      
      <video ref={videoRef} autoPlay={true} style={{width: 600, height: 400}}/>
    
      <audio ref={audioRef} autoPlay={true} />
    </div>
  )
};

export default Participant;
