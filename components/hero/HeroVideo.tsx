export default function HeroVideo() {
  return (
    <>
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source 
          src="https://res.cloudinary.com/di3x3rekl/video/upload/v1/0609_1_online-video-cutter.com_jkdpd2.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>
    </>
  );
}
