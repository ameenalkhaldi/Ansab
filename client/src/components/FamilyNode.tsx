import React from 'react';
import type { FamilyMember } from '../types';

interface Props {
  member: FamilyMember;
  hasChildren: boolean;
  isChildrenVisible: boolean;
  toggleChildren: () => void;
  onClick?: () => void;
  darkMode?: boolean;
}

const FamilyNode: React.FC<Props> = ({
  member,
  hasChildren,
  isChildrenVisible,
  toggleChildren,
  onClick,
  darkMode = false
}) => {
  const birth = member.birthYear !== undefined && member.birthYear !== null ? member.birthYear : '?';
  const death = member.deathYear !== undefined && member.deathYear !== null ? member.deathYear : '?';

  const nodeStyles: React.CSSProperties = {
    width: 200,
    minHeight: 100,
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.35)' : '#999'}`,
    borderRadius: 12,
    padding: 12,
    background: darkMode ? 'rgba(32, 43, 35, 0.92)' : '#fff',
    color: darkMode ? '#f5f5f5' : '#333',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: darkMode
      ? '0 12px 28px rgba(0,0,0,0.45)'
      : '0 10px 25px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backdropFilter: darkMode ? 'blur(6px)' : undefined,
    transition: 'transform 0.15s ease, box-shadow 0.2s ease',
  };

  const buttonStyles: React.CSSProperties = {
    marginTop: 8,
    borderRadius: '999px',
    width: 28,
    height: 28,
    fontSize: '16px',
    border: 'none',
    background: darkMode ? 'rgba(45, 122, 75, 0.3)' : '#eef2ef',
    color: darkMode ? '#f5f5f5' : '#1f3526',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1,
    alignSelf: 'center',
    boxShadow: darkMode
      ? '0 6px 12px rgba(0,0,0,0.35)'
      : '0 4px 10px rgba(0,0,0,0.12)'
  };

  return (
    <div
      id={member.id}
      className="family-node"
      onClick={onClick}
      style={nodeStyles}
    >
      <div>
        <div style={{ fontWeight: 'bold' }}>{member.name}</div>

        <div style={{ fontSize: '0.85em', color: darkMode ? 'rgba(240,240,240,0.75)' : '#555' }}>
          {birth} – {death}
        </div>

        {member.tagline ? (
          <div style={{
            marginTop: 4,
            fontSize: '0.8em',
            fontStyle: 'italic',
            color: darkMode ? 'rgba(220,220,220,0.7)' : '#777',
          }}>
            {member.tagline}
          </div>
        ) : (
          <div style={{
            marginTop: 4,
            fontSize: '0.8em',
            visibility: 'hidden'
          }}>
            placeholder
          </div>
        )}
      </div>

      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleChildren();
          }}
          style={buttonStyles}
          title={isChildrenVisible ? "Hide Children" : "Show Children"}
        >
          {isChildrenVisible ? '➖' : '➕'}
        </button>
      )}
    </div>
  );
};

export default FamilyNode;
