import React, { useEffect, useRef } from "react";
import $ from "jquery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VideoScroll.css"; // CSS file for styling

gsap.registerPlugin(ScrollTrigger);

const VideoScroll = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // GSAP QuickSetter for smooth updates
        let setCurrentTime = gsap.quickTo(video, "currentTime", { ease: "power2.out", duration: 0.2 });

        gsap.to(video, {
            scrollTrigger: {
                trigger: video,
                start: "top top",
                end: "bottom top",
                scrub: 3,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    let progress = self.progress.toFixed(3);
                    setCurrentTime(progress * video.duration);
                    video.playbackRate = Math.max(0.2, 1 - progress * 0.8);
                }
            }
        });

    }, []);

    return (
        <div>
            <div className="section">Welcome to MacBook Air Scroll</div>
            
            <div className="video-container">
                <video ref={videoRef} muted playsInline>
                    <source src="https://www.apple.com/105/media/us/macbook-air/2024/abecf8fa-b944-4698-94ce-14616e166bff/anim/hero/large.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="spacer"></div>
        </div>
    );
};

export default VideoScroll;
