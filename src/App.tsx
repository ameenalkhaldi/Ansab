import React, { useState, useRef, useEffect, useCallback } from 'react';
import FamilyTree from './components/FamilyTree';
import SearchBox from './components/SearchBox';
import BioModal from './components/BioModal';
import familyTreeData, { FamilyMember } from './data/familyTreeData';
import './App.css';

const baseZoomButtonStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  border: '1px solid #333',
  cursor: 'pointer',
  fontSize: '1.15rem',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 3px 10px rgba(0,0,0,0.18)'
};

const getZoomButtonStyle = (darkMode: boolean): React.CSSProperties => ({
  ...baseZoomButtonStyle,
  background: darkMode ? '#2d2d2d' : '#fff',
  color: darkMode ? '#f5f5f5' : '#222',
  border: `1px solid ${darkMode ? '#555' : '#333'}`
});

const App: React.FC = () => {
  const [rootId] = useState('adnan');
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const [showChildren, setShowChildren] = useState<Set<string>>(new Set([
    'adnan', 'maad', 'nizar', 'mudar', 'ilyas', 'mudrikah', 'khuzaymah', 'kinanah', 'nadr',
    'malik', 'fihr', 'ghalib', 'luhayy', 'kaab', 'murrah', 'kilab', 'qusayy', 'abd-manaf',
    'hashim', 'abdul-muttalib', 'abdullah'
  ]));

  const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasCenteredInitially = useRef(false);
  const lastCenteredId = useRef<string>('prophet');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // 🔒 Disable browser pinch/zoom
  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    const preventGesture = (e: Event) => e.preventDefault();

    window.addEventListener('wheel', preventZoom, { passive: false });
    window.addEventListener('gesturestart', preventGesture);
    window.addEventListener('gesturechange', preventGesture);
    window.addEventListener('gestureend', preventGesture);

    return () => {
      window.removeEventListener('wheel', preventZoom);
      window.removeEventListener('gesturestart', preventGesture);
      window.removeEventListener('gesturechange', preventGesture);
      window.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  const zoomIn = useCallback(() => {
    const factor = 1.2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = (centerX - translate.x) / scale;
    const mouseY = (centerY - translate.y) / scale;

    setScale(prevScale => {
      const newScale = Math.min(prevScale * factor, 4);
      setTranslate({
        x: centerX - mouseX * newScale,
        y: centerY - mouseY * newScale,
      });
      return newScale;
    });
  }, [scale, translate.x, translate.y]);

  const zoomOut = useCallback(() => {
    const factor = 1 / 1.2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = (centerX - translate.x) / scale;
    const mouseY = (centerY - translate.y) / scale;

    setScale(prevScale => {
      const newScale = Math.max(prevScale * factor, 0.2);
      setTranslate({
        x: centerX - mouseX * newScale,
        y: centerY - mouseY * newScale,
      });
      return newScale;
    });
  }, [scale, translate.x, translate.y]);

  const centerOnCoordinates = useCallback((x: number, y: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setTranslate({
      x: centerX - x * scale,
      y: centerY - y * scale,
    });
  }, [scale]);

  const resetZoom = useCallback(() => {
    setScale(1);

    // Delay centering until after scale change takes effect
    setTimeout(() => {
      const targetId = lastCenteredId.current;
      const el = document.getElementById(targetId);
      const container = document.querySelector('.family-tree-root');
      if (el && container) {
        const box = el.getBoundingClientRect();
        const graph = container.getBoundingClientRect();
        const x = (box.left + box.width / 2 - graph.left);
        const y = (box.top + box.height / 2 - graph.top);
        setTranslate({
          x: window.innerWidth / 2 - x,
          y: window.innerHeight / 2 - y
        });
      }
    }, 50); // short delay allows scale to apply
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleWheel = (e: React.WheelEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - container.left - translate.x) / scale;
    const mouseY = (e.clientY - container.top - translate.y) / scale;

    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomIntensity = 0.003;
      setScale(prevScale => {
        const newScale = Math.min(Math.max(0.2, prevScale * (1 - e.deltaY * zoomIntensity)), 4);
        setTranslate({
          x: e.clientX - container.left - mouseX * newScale,
          y: e.clientY - container.top - mouseY * newScale
        });
        return newScale;
      });
    } else {
      setTranslate(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    panStart.current = { x: e.clientX - translate.x, y: e.clientY - translate.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setTranslate({
      x: e.clientX - panStart.current.x,
      y: e.clientY - panStart.current.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsPanning(true);
    const touch = e.touches[0];
    panStart.current = { x: touch.clientX - translate.x, y: touch.clientY - translate.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPanning || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTranslate({
      x: touch.clientX - panStart.current.x,
      y: touch.clientY - panStart.current.y,
    });
  };

  const handleTouchEnd = () => setIsPanning(false);

  const handleSearchSelect = (member: FamilyMember) => {
    const ancestors = new Set<string>();
    let current = member;
    while (current.fatherId) {
      ancestors.add(current.fatherId);
      const next = familyTreeData.find(m => m.id === current.fatherId);
      if (!next) break;
      current = next;
    }
    setShowChildren(prev => new Set([...prev, ...ancestors]));
    setSelectedMember(member);
    lastCenteredId.current = member.id;

    setTimeout(() => {
      const el = document.getElementById(member.id);
      const container = document.querySelector('.family-tree-root');
      if (el && container) {
        const box = el.getBoundingClientRect();
        const graph = container.getBoundingClientRect();
        const x = (box.left + box.width / 2 - graph.left) / scale;
        const y = (box.top + box.height / 2 - graph.top) / scale;
        centerOnCoordinates(x, y);
      }
    }, 100);
  };

  useEffect(() => {
    if (hasCenteredInitially.current) return;

    const el = document.getElementById('prophet');
    const container = document.querySelector('.family-tree-root');
    if (el && container) {
      const box = el.getBoundingClientRect();
      const graph = container.getBoundingClientRect();
      const x = (box.left + box.width / 2 - graph.left) / scale;
      const y = (box.top + box.height / 2 - graph.top) / scale;
      centerOnCoordinates(x, y);
      hasCenteredInitially.current = true;
      lastCenteredId.current = 'prophet';
    }
  }, [scale, centerOnCoordinates]);

  const zoomButtonStyle = getZoomButtonStyle(darkMode);

  return (
    <div
      className={`app-container ${darkMode ? 'dark-mode' : ''}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <header className="app-header">
        <h1 className="app-title">Prophet ﷺ Family Tree</h1>
        <div className="search-container">
          <SearchBox onSelect={handleSearchSelect} />
        </div>
      </header>

      <div className="zoom-controls">
        <button onClick={toggleDarkMode} style={zoomButtonStyle} title="Toggle Dark Mode" aria-label="Toggle dark mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={zoomIn} style={zoomButtonStyle} aria-label="Zoom in">＋</button>
        <button onClick={zoomOut} style={zoomButtonStyle} aria-label="Zoom out">－</button>
        <button onClick={resetZoom} style={zoomButtonStyle} aria-label="Reset zoom">⟲</button>
      </div>

      {selectedMember && (
        <BioModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSelect={(m) => setSelectedMember(m)}
        />
      )}

      <div
        className="family-tree-root"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        <FamilyTree
          rootId={rootId}
          scale={scale}
          darkMode={darkMode}
          onSelectMember={setSelectedMember}
          showChildren={showChildren}
          setShowChildren={setShowChildren}
        />
      </div>
    </div>
  );
};

export default App;
