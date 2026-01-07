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

  // Arabesque color palette
  const colors = {
    light: {
      bg: '#faf8f0',
      border: '#c9a227',
      borderHover: '#dbb42c',
      text: '#2c2416',
      textMuted: '#5c503a',
      tagline: '#6b5b3d',
      btnBg: '#f5f1e3',
      btnBgHover: '#e8e0c8',
      btnBorder: '#a6851d',
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowHover: 'rgba(0, 0, 0, 0.15)',
    },
    dark: {
      bg: '#1b263b',
      border: '#c9a227',
      borderHover: '#dbb42c',
      text: '#e8e0c8',
      textMuted: '#a69a80',
      tagline: '#b8a87a',
      btnBg: '#0d1b2a',
      btnBgHover: '#415a77',
      btnBorder: '#c9a227',
      shadow: 'rgba(0, 0, 0, 0.35)',
      shadowHover: 'rgba(0, 0, 0, 0.45)',
    }
  };

  const c = darkMode ? colors.dark : colors.light;

  const nodeStyles: React.CSSProperties = {
    width: 200,
    minHeight: 110,
    padding: '14px 16px',
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: 0, // Sharp corners for arabesque aesthetic
    color: c.text,
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: `0 4px 16px ${c.shadow}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    fontFamily: "'Amiri', 'Times New Roman', serif",
  };

  // Corner decorations
  const cornerStyle = (position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '12px',
      height: '12px',
      borderColor: c.border,
      borderStyle: 'solid',
      borderWidth: 0,
    };

    switch (position) {
      case 'topLeft':
        return { ...base, top: 4, left: 4, borderTopWidth: 1, borderLeftWidth: 1 };
      case 'topRight':
        return { ...base, top: 4, right: 4, borderTopWidth: 1, borderRightWidth: 1 };
      case 'bottomLeft':
        return { ...base, bottom: 4, left: 4, borderBottomWidth: 1, borderLeftWidth: 1 };
      case 'bottomRight':
        return { ...base, bottom: 4, right: 4, borderBottomWidth: 1, borderRightWidth: 1 };
    }
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    fontSize: '1.05rem',
    letterSpacing: '0.03em',
    marginBottom: 2,
  };

  const yearsStyles: React.CSSProperties = {
    fontSize: '0.82rem',
    color: c.textMuted,
    letterSpacing: '0.08em',
  };

  const taglineStyles: React.CSSProperties = {
    marginTop: 6,
    fontSize: '0.78rem',
    fontStyle: 'italic',
    color: c.tagline,
    lineHeight: 1.3,
  };

  const buttonStyles: React.CSSProperties = {
    marginTop: 10,
    width: 28,
    height: 28,
    fontSize: '14px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    border: `1px solid ${c.btnBorder}`,
    background: c.btnBg,
    color: c.border,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1,
    alignSelf: 'center',
    transition: 'background 0.15s ease, transform 0.1s ease',
  };

  return (
    <div
      id={member.id}
      className="family-node"
      onClick={onClick}
      style={nodeStyles}
    >
      {/* Corner decorations */}
      <span style={cornerStyle('topLeft')} />
      <span style={cornerStyle('topRight')} />
      <span style={cornerStyle('bottomLeft')} />
      <span style={cornerStyle('bottomRight')} />

      <div>
        <div style={nameStyles}>{member.name}</div>
        <div style={yearsStyles}>{birth} - {death}</div>

        {member.tagline ? (
          <div style={taglineStyles}>{member.tagline}</div>
        ) : (
          <div style={{ ...taglineStyles, visibility: 'hidden' }}>placeholder</div>
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
          onMouseOver={(e) => {
            e.currentTarget.style.background = c.btnBgHover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = c.btnBg;
          }}
        >
          {isChildrenVisible ? '-' : '+'}
        </button>
      )}
    </div>
  );
};

export default FamilyNode;
