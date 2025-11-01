import React, { useState, useEffect, useMemo, useCallback } from 'react';
import familyTreeData, { FamilyMember } from '../data/familyTreeData';
import FamilyNode from './FamilyNode';
import ConnectorLines from './ConnectorLines';

interface Positioned {
  member: FamilyMember;
  x: number;
  y: number;
}
interface Line { fromId: string; toId: string; }

interface Props {
  rootId: string;
  scale: number;
  darkMode: boolean;
  onSelectMember: (member: FamilyMember) => void;
  onLayoutComputed?: (centerOf: { id: string, x: number, y: number }) => void;
  centerOnId?: string;
  showChildren: Set<string>;
  setShowChildren: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const BASE_NODE_WIDTH = 200;
const BASE_NODE_HEIGHT = 100;
const BASE_X_SPACING = 40;
const BASE_Y_SPACING = 120;

const getLayoutMetrics = (viewportWidth: number) => {
  if (viewportWidth < 400) {
    return { nodeWidth: 140, nodeHeight: 84, xSpacing: 24, ySpacing: 90 };
  }
  if (viewportWidth < 520) {
    return { nodeWidth: 160, nodeHeight: 92, xSpacing: 28, ySpacing: 100 };
  }
  if (viewportWidth < 768) {
    return { nodeWidth: 180, nodeHeight: 96, xSpacing: 32, ySpacing: 110 };
  }
  if (viewportWidth < 1024) {
    return { nodeWidth: 190, nodeHeight: 100, xSpacing: 36, ySpacing: 115 };
  }
  return { nodeWidth: BASE_NODE_WIDTH, nodeHeight: BASE_NODE_HEIGHT, xSpacing: BASE_X_SPACING, ySpacing: BASE_Y_SPACING };
};

const FamilyTree: React.FC<Props> = ({ rootId, scale, darkMode, onSelectMember, onLayoutComputed, centerOnId, showChildren, setShowChildren }) => {
  const childrenMap = useMemo(() => {
    const m = new Map<string, FamilyMember[]>();
    familyTreeData.forEach(mbr => {
      if (mbr.fatherId) {
        if (!m.has(mbr.fatherId)) m.set(mbr.fatherId, []);
        m.get(mbr.fatherId)!.push(mbr);
      }
    });
    return m;
  }, []);

  const [layoutMetrics, setLayoutMetrics] = useState(() => {
    if (typeof window !== 'undefined') {
      return getLayoutMetrics(window.innerWidth);
    }
    return { nodeWidth: BASE_NODE_WIDTH, nodeHeight: BASE_NODE_HEIGHT, xSpacing: BASE_X_SPACING, ySpacing: BASE_Y_SPACING };
  });

  useEffect(() => {
    const handleResize = () => {
      setLayoutMetrics(getLayoutMetrics(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nodeWidth, nodeHeight, xSpacing, ySpacing } = layoutMetrics;

  const computeLayout = useCallback((id: string, depth: number, xOffset: number): { positions: Positioned[], width: number } => {
    const node = familyTreeData.find(m => m.id === id);
    if (!node) return { positions: [], width: 0 };

    const children = showChildren.has(id) ? (childrenMap.get(id) || []) : [];
    if (children.length === 0) {
      return {
        positions: [{ member: node, x: xOffset, y: depth }],
        width: 1
      };
    }

    let totalWidth = 0;
    const childPositions: Positioned[] = [];

    children.forEach(child => {
      const { positions, width } = computeLayout(child.id, depth + 1, xOffset + totalWidth);
      childPositions.push(...positions);
      totalWidth += width;
    });

    const myX = xOffset + totalWidth / 2 - 0.5;
    return {
      positions: [{ member: node, x: myX, y: depth }, ...childPositions],
      width: totalWidth
    };
  }, [childrenMap, showChildren]);

  const { positions } = useMemo(() => computeLayout(rootId, 0, 0), [rootId, showChildren, computeLayout]);

  useEffect(() => {
    if (!onLayoutComputed) return;
    if (centerOnId) {
      const target = positions.find(p => p.member.id === centerOnId);
      if (target) {
        onLayoutComputed({
          id: centerOnId,
          x: target.x * (nodeWidth + xSpacing),
          y: target.y * (nodeHeight + ySpacing)
        });
      }
    }
  }, [positions, onLayoutComputed, centerOnId, nodeWidth, nodeHeight, xSpacing, ySpacing]);

  const lines: Line[] = useMemo(() => {
    const visibleIds = new Set(positions.map(p => p.member.id));
    const out: Line[] = [];
    positions.forEach(p => {
      const id = p.member.id;
      if (showChildren.has(id)) {
        (childrenMap.get(id) || []).forEach(c => {
          if (visibleIds.has(c.id)) out.push({ fromId: id, toId: c.id });
        });
      }
    });
    return out;
  }, [positions, showChildren, childrenMap]);

  const toggleKids = (id: string) => {
    setShowChildren(prev => {
      const nxt = new Set(prev);
      nxt.has(id) ? nxt.delete(id) : nxt.add(id);
      return nxt;
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {positions.map(({ member, x, y }) => {
        const hasKids = (childrenMap.get(member.id) || []).length > 0;
        const kidsVisible = showChildren.has(member.id);
        return (
          <div
            key={member.id}
            id={member.id}
            style={{
              position: 'absolute',
              left: x * (nodeWidth + xSpacing),
              top: y * (nodeHeight + ySpacing),
            }}
          >
            <FamilyNode
              member={member}
              hasChildren={hasKids}
              isChildrenVisible={kidsVisible}
              toggleChildren={() => toggleKids(member.id)}
              onClick={() => onSelectMember(member)}
              width={nodeWidth}
              height={nodeHeight}
              darkMode={darkMode}
            />
          </div>
        );
      })}
      <ConnectorLines lines={lines} scale={scale} darkMode={darkMode} />
    </div>
  );
};

export default FamilyTree;
