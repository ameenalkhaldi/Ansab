import React, { useState, useEffect, useMemo } from 'react';
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

const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;
const X_SPACING = 40;
const Y_SPACING = 120;

const FamilyTree: React.FC<Props> = ({ rootId, scale, darkMode, onSelectMember, onLayoutComputed, centerOnId, showChildren, setShowChildren }) => {
  const parentMap = useMemo(() => {
    const m = new Map<string, string>();
    familyTreeData.forEach(mbr => { if (mbr.fatherId) m.set(mbr.id, mbr.fatherId); });
    return m;
  }, []);

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

  const computeLayout = (id: string, depth: number, xOffset: number): { positions: Positioned[], width: number } => {
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
  };

  const { positions } = useMemo(() => computeLayout(rootId, 0, 0), [rootId, showChildren]);

  const layoutSize = useMemo(() => {
    if (positions.length === 0) {
      return { width: NODE_WIDTH, height: NODE_HEIGHT };
    }
    const maxX = Math.max(...positions.map(p => p.x));
    const maxY = Math.max(...positions.map(p => p.y));
    const width = (maxX + 1) * (NODE_WIDTH + X_SPACING);
    const height = (maxY + 1) * (NODE_HEIGHT + Y_SPACING);
    return {
      width: Math.max(width, NODE_WIDTH),
      height: Math.max(height, NODE_HEIGHT),
    };
  }, [positions]);

  useEffect(() => {
    if (!onLayoutComputed) return;
    if (centerOnId) {
      const target = positions.find(p => p.member.id === centerOnId);
      if (target) {
        onLayoutComputed({
          id: centerOnId,
          x: target.x * (NODE_WIDTH + X_SPACING),
          y: target.y * (NODE_HEIGHT + Y_SPACING)
        });
      }
    }
  }, [positions, onLayoutComputed, centerOnId]);

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
    <div style={{ position: 'relative', width: layoutSize.width, height: layoutSize.height }}>
      {positions.map(({ member, x, y }) => {
        const hasKids = (childrenMap.get(member.id) || []).length > 0;
        const kidsVisible = showChildren.has(member.id);
        return (
          <div
            key={member.id}
            id={member.id}
            style={{
              position: 'absolute',
              left: x * (NODE_WIDTH + X_SPACING),
              top: y * (NODE_HEIGHT + Y_SPACING),
            }}
          >
            <FamilyNode
              member={member}
              hasChildren={hasKids}
              isChildrenVisible={kidsVisible}
              toggleChildren={() => toggleKids(member.id)}
              onClick={() => onSelectMember(member)}
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
