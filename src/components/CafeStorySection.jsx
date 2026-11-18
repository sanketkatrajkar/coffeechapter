import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import './CafeStorySection.css'

const storyVideos = [
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-15.mp4`,
    title: 'Mango Chilli, Poured Fresh',
  },
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-20.mp4`,
    title: 'A Tool Behind the Bar',
  },
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-27.mp4`,
    title: 'A Peek at the Menu',
  },
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-32.mp4`,
    title: 'Behind the Coffee Counter',
  },
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-39.mp4`,
    title: 'Come for the Coffee',
  },
  {
    src: `${import.meta.env.BASE_URL}Videos/video_2026-11-12_14-19-44.mp4`,
    title: 'A Barista at Work',
  },
]

function CafeStoryVideo({ video, isMuted, onToggleAudio }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const element = videoRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().catch((error) => {
            if (error.name !== 'AbortError') {
              console.error(`Unable to play story video "${video.title}".`, error)
            }
          })
        } else {
          element.pause()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [video.title])

  return (
    <div className="cafe-story-card" role="listitem">
      <video
        ref={videoRef}
        className="cafe-story-video"
        src={video.src}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        aria-label={video.title}
      />
      <button
        className="cafe-story-audio-control"
        type="button"
        onClick={onToggleAudio}
        aria-label={`${isMuted ? 'Enable' : 'Mute'} audio for ${video.title}`}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}
      </button>
    </div>
  )
}

function CafeStorySection() {
  const [activeAudioSrc, setActiveAudioSrc] = useState(null)

  function toggleAudio(src) {
    setActiveAudioSrc((activeSrc) => (activeSrc === src ? null : src))
  }

  return (
    <section className="cafe-story-section page-section" aria-labelledby="cafe-story-title">
      <div className="cafe-story-intro">
        <div className="cafe-story-ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <h2 id="cafe-story-title">Behind Every Sip, There&apos;s a Story.</h2>
      </div>

      <div
        className="cafe-story-gallery"
        role="list"
        aria-label="Café story videos"
        tabIndex={0}
      >
        {storyVideos.map((video) => (
          <CafeStoryVideo
            video={video}
            isMuted={activeAudioSrc !== video.src}
            onToggleAudio={() => toggleAudio(video.src)}
            key={video.src}
          />
        ))}
      </div>

      <div className="cafe-story-ornament cafe-story-ornament--bottom" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  )
}

export default CafeStorySection
