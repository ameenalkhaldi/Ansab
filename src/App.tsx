import React, { useState, useRef, useEffect } from 'react';
import FamilyTree from './components/FamilyTree';
import SearchBox from './components/SearchBox';
import BioModal from './components/BioModal';
import familyTreeData, { FamilyMember } from './data/familyTreeData';

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
  const touchPanStart = useRef<{ x: number; y: number } | null>(null);
  const pinchState = useRef<{
    distance: number;
    scale: number;
  } | null>(null);
  const hasCenteredInitially = useRef(false);
  const lastCenteredId = useRef<string>('prophet');
  const viewportRef = useRef<HTMLDivElement | null>(null);

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

  const clampScale = (value: number) => Math.min(Math.max(value, 0.2), 4);

  const zoomIn = () => {
    const factor = 1.2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = (centerX - translate.x) / scale;
    const mouseY = (centerY - translate.y) / scale;

    setScale(prevScale => {
      const newScale = clampScale(prevScale * factor);
      setTranslate({
        x: centerX - mouseX * newScale,
        y: centerY - mouseY * newScale,
      });
      return newScale;
    });
  };

  const zoomOut = () => {
    const factor = 1 / 1.2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = (centerX - translate.x) / scale;
    const mouseY = (centerY - translate.y) / scale;

    setScale(prevScale => {
      const newScale = clampScale(prevScale * factor);
      setTranslate({
        x: centerX - mouseX * newScale,
        y: centerY - mouseY * newScale,
      });
      return newScale;
    });
  };

  const centerOnCoordinates = (x: number, y: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setTranslate({
      x: centerX - x * scale,
      y: centerY - y * scale,
    });
  };

  const resetZoom = () => {
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
  };


  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleWheel = (e: React.WheelEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - container.left - translate.x) / scale;
    const mouseY = (e.clientY - container.top - translate.y) / scale;

    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomIntensity = 0.003;
      setScale(prevScale => {
        const newScale = clampScale(prevScale * (1 - e.deltaY * zoomIntensity));
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
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      touchPanStart.current = {
        x: touch.clientX - translate.x,
        y: touch.clientY - translate.y,
      };
    } else if (e.touches.length === 2) {
      const [t1, t2] = Array.from(e.touches);
      const distance = Math.hypot(
        t1.clientX - t2.clientX,
        t1.clientY - t2.clientY
      );
      pinchState.current = {
        distance,
        scale,
      };
      setIsPanning(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning && touchPanStart.current) {
      e.preventDefault();
      const touch = e.touches[0];
      setTranslate({
        x: touch.clientX - touchPanStart.current.x,
        y: touch.clientY - touchPanStart.current.y,
      });
    } else if (e.touches.length === 2 && pinchState.current) {
      e.preventDefault();
      const [t1, t2] = Array.from(e.touches);
      const newDistance = Math.hypot(
        t1.clientX - t2.clientX,
        t1.clientY - t2.clientY
      );
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = (t1.clientX + t2.clientX) / 2 - rect.left;
      const centerY = (t1.clientY + t2.clientY) / 2 - rect.top;

      setScale(prevScale => {
        const newScale = clampScale(
          pinchState.current!.scale * (newDistance / pinchState.current!.distance)
        );

        setTranslate(prevTranslate => {
          const relativeX = (centerX - prevTranslate.x) / prevScale;
          const relativeY = (centerY - prevTranslate.y) / prevScale;
          return {
            x: centerX - relativeX * newScale,
            y: centerY - relativeY * newScale,
          };
        });

        pinchState.current = {
          distance: newDistance,
          scale: newScale,
        };

        return newScale;
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2 && pinchState.current) {
      pinchState.current = null;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchPanStart.current = {
        x: touch.clientX - translate.x,
        y: touch.clientY - translate.y,
      };
      setIsPanning(true);
    } else {
      touchPanStart.current = null;
      setIsPanning(false);
    }
  };

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
  }, [scale]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setScale(prev => clampScale(Math.min(prev, 0.8)));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const targetId = lastCenteredId.current;
      const el = document.getElementById(targetId);
      const container = document.querySelector('.family-tree-root');
      if (el && container) {
        const box = el.getBoundingClientRect();
        const graph = container.getBoundingClientRect();
        const x = (box.left + box.width / 2 - graph.left) / scale;
        const y = (box.top + box.height / 2 - graph.top) / scale;
        centerOnCoordinates(x, y);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  const treeInteractionHandlers = {
    onWheel: handleWheel,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
  } as const;

  return (
    <div
      className={`app-shell ${darkMode ? 'dark-mode' : ''} ${selectedMember ? 'has-modal' : ''}`}
      style={{
        background: darkMode ? '#222' : '#f5f5f5',
      }}
    >
      <h1 className="app-title" style={{ color: darkMode ? '#eee' : '#333' }}>
        Prophet ﷺ Family Tree
      </h1>

      <div className="search-container">
        <SearchBox onSelect={handleSearchSelect} />
      </div>

      <div className="control-panel">
        <button onClick={toggleDarkMode} style={getZoomButtonStyle(darkMode)} title="Toggle Dark Mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={zoomIn} style={getZoomButtonStyle(darkMode)}>＋</button>
        <button onClick={zoomOut} style={getZoomButtonStyle(darkMode)}>－</button>
        <button onClick={resetZoom} style={getZoomButtonStyle(darkMode)}>⟲</button>
      </div>

      {selectedMember && (
        <BioModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSelect={(m) => setSelectedMember(m)}
          darkMode={darkMode}
        />
      )}

      <div
        ref={viewportRef}
        className="tree-viewport"
        {...treeInteractionHandlers}
      >
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
    </div>
  );
};

const getZoomButtonStyle = (isDark: boolean): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: '50%',
  border: `2px solid ${isDark ? '#d4d4d4' : '#333'}`,
  background: isDark ? 'rgba(26, 43, 32, 0.75)' : 'rgba(255,255,255,0.9)',
  color: isDark ? '#f4f4f4' : '#222',
  cursor: 'pointer',
  fontSize: '1.1rem',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
  backdropFilter: 'blur(2px)'
});

export default App;
