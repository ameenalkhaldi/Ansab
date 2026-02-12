import React, { useEffect, useState, useRef } from 'react';

interface Line { fromId: string; toId: string; }
interface Props { lines: Line[]; scale: number; darkMode: boolean; }
interface LinePosition {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const ConnectorLines: React.FC<Props> = ({ lines, scale, darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<LinePosition[]>([]);

  useEffect(() => {
    const arr = lines.map(l => {
      const fEl = document.getElementById(l.fromId);
      const tEl = document.getElementById(l.toId);
      const cb = containerRef.current?.getBoundingClientRect();
      if (fEl && tEl && cb) {
        const f = fEl.getBoundingClientRect();
        const t = tEl.getBoundingClientRect();
        return {
          from: {
            x: (f.left + f.width / 2 - cb.left) / scale,
            y: (f.bottom - cb.top) / scale,
          },
          to: {
            x: (t.left + t.width / 2 - cb.left) / scale,
            y: (t.top - cb.top) / scale,
          }
        };
      }
      return null;
    }).filter((x): x is LinePosition => x !== null);
    setPos(arr);
  }, [lines, scale]);

  // Arabesque gold color for lines
  const strokeColor = darkMode ? '#c9a227' : '#a6851d';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0
      }}
    >
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        {pos.map((p, i) => {
          const mY = (p.from.y + p.to.y) / 2;
          return (
            <g key={i}>
              <line 
                x1={p.from.x} y1={p.from.y} x2={p.from.x} y2={mY}
                stroke={strokeColor} 
                strokeWidth={1.5}
                strokeDasharray="none"
              />
              <line 
                x1={p.from.x} y1={mY} x2={p.to.x} y2={mY}
                stroke={strokeColor} 
                strokeWidth={1.5}
                strokeDasharray="none"
              />
              <line 
                x1={p.to.x} y1={mY} x2={p.to.x} y2={p.to.y}
                stroke={strokeColor} 
                strokeWidth={1.5}
                strokeDasharray="none"
              />
              {/* Small diamond at junction point */}
              <circle
                cx={p.from.x}
                cy={mY}
                r={3}
                fill={strokeColor}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectorLines;
