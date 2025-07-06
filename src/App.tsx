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
  const hasCenteredInitially = useRef(false);
  const lastCenteredId = useRef<string>('prophet');

  const zoomIn = () => setScale((s) => Math.min(s * 1.2, 4));
  const zoomOut = () => setScale((s) => Math.max(s / 1.2, 0.2));

  const centerOnCoordinates = (x: number, y: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setTranslate({
      x: centerX - x * scale,
      y: centerY - y * scale,
    });
  };

  const resetZoom = () => {
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
    setScale(1);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey || Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const zoomIntensity = 0.001;
      setScale(prev => {
        const next = prev * (1 - e.deltaY * zoomIntensity);
        return Math.min(Math.max(0.2, next), 4);
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

  return (
    <div
      className={darkMode ? 'dark-mode' : ''}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: darkMode ? '#222' : '#f5f5f5',
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h1 style={{
        position: 'absolute', top: 10, left: 20, margin: 0,
        color: darkMode ? '#eee' : '#333', fontSize: '1.2rem', zIndex: 20
      }}>
        Prophet ﷺ Family Tree
      </h1>

      <div style={{ position: 'absolute', top: 10, right: 20, zIndex: 20 }}>
        <SearchBox onSelect={handleSearchSelect} />
      </div>

      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20
      }}>
        <button onClick={toggleDarkMode} style={zoomButtonStyle} title="Toggle Dark Mode">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={zoomIn} style={zoomButtonStyle}>＋</button>
        <button onClick={zoomOut} style={zoomButtonStyle}>－</button>
        <button onClick={resetZoom} style={zoomButtonStyle}>⟲</button>
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
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
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

const zoomButtonStyle: React.CSSProperties = {
  width: 36, height: 36,
  borderRadius: '50%', border: '2px solid #333',
  background: 'white', cursor: 'pointer',
  fontSize: '1.1rem', lineHeight: 1,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default App;
