import { useRef } from 'react';
import { useUI } from '@/lib/context/AppContext';
import { STORIES } from '@/lib/data/stories';
import { useOverlayAnimation } from '@/lib/animations/hooks/useOverlayAnimation';

export default function StoryOverlay() {
  const { activeOverlay, closeOverlay, selectedStoryId } = useUI();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = activeOverlay === 'storyOverlay';
  useOverlayAnimation(containerRef, isActive);

  const story = STORIES.find((s) => s.id === selectedStoryId);

  return (
    <div
      ref={containerRef}
      className={`overlay-backdrop ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay('storyOverlay');
      }}
    >
      <div className="overlay-drawer wide-drawer">
        <div className="overlay-header">
          <h2>Culture Editorial</h2>
          <button
            type="button"
            className="overlay-close"
            onClick={() => closeOverlay('storyOverlay')}
            aria-label="Close story drawer"
          >
            &times;
          </button>
        </div>

        <div className="overlay-content">
          {story ? (
            <article className="story-essay-layout">
              <div className="story-essay-hero">
                <img src={story.image} alt={story.title} className="story-essay-img" />
                <div className="story-essay-meta-strip">
                  <span className="story-essay-category">{story.category.toUpperCase()}</span>
                  <span className="story-essay-separator">&bull;</span>
                  <span className="story-essay-date">{story.date}</span>
                </div>
              </div>

              <div className="story-essay-body-container">
                <h1 className="story-essay-title">{story.title}</h1>
                <p className="story-essay-excerpt">{story.excerpt}</p>
                <div
                  className="story-essay-markdown"
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
              </div>
            </article>
          ) : (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px 0' }}>
              <p>Essay not found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
