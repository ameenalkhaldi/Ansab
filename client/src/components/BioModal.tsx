import React from 'react';
import type { FamilyMember } from '../types';

interface Props {
  member: FamilyMember;
  members: FamilyMember[];
  onClose: () => void;
  onSelect: (member: FamilyMember) => void;
}

const BioModal: React.FC<Props> = ({ member, members, onClose, onSelect }) => {
  const father = members.find(m => m.id === member.fatherId);
  const children = members.filter(m => m.fatherId === member.id);

  // Arabesque panel styles
  const panelStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 340,
    maxWidth: '90vw',
    padding: '24px',
    paddingTop: '20px',
    background: '#faf8f0',
    borderRight: '2px solid #c9a227',
    overflowY: 'auto',
    zIndex: 25,
    fontFamily: "'Amiri', 'Times New Roman', serif",
    color: '#2c2416',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e8e0c8',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.6rem',
    fontWeight: 600,
    color: '#2c2416',
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  };

  const closeButtonStyles: React.CSSProperties = {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid #c9a227',
    color: '#c9a227',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    transition: 'background 0.15s ease, color 0.15s ease',
    flexShrink: 0,
    marginLeft: '12px',
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: '18px',
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#6b5b3d',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    display: 'block',
  };

  const textStyles: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#2c2416',
    margin: 0,
  };

  const linkStyles: React.CSSProperties = {
    color: '#8b3d4f',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.15s ease',
    cursor: 'pointer',
  };

  const biographyStyles: React.CSSProperties = {
    marginTop: '20px',
    padding: '16px',
    background: '#f5f1e3',
    border: '1px solid #e8e0c8',
    position: 'relative',
  };

  const decorativeBorderStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #c9a227, transparent)',
  };

  const sourcesListStyles: React.CSSProperties = {
    margin: 0,
    paddingLeft: '20px',
    listStyleType: 'none',
  };

  const sourceItemStyles: React.CSSProperties = {
    position: 'relative',
    marginBottom: '8px',
    paddingLeft: '12px',
  };

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      style={panelStyles}
    >
      {/* Decorative top border */}
      <div style={decorativeBorderStyles} />

      <header style={headerStyles}>
        <h2 style={titleStyles}>{member.name}</h2>
        <button 
          onClick={onClose} 
          style={closeButtonStyles}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#c9a227';
            e.currentTarget.style.color = '#faf8f0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#c9a227';
          }}
          title="Close"
        >
          X
        </button>
      </header>

      {(member.birthYear || member.deathYear) && (
        <div style={sectionStyles}>
          <span style={labelStyles}>Lifespan</span>
          <p style={textStyles}>
            {member.birthYear ?? 'Unknown'} - {member.deathYear ?? 'Unknown'}
          </p>
        </div>
      )}

      {father && (
        <div style={sectionStyles}>
          <span style={labelStyles}>Father</span>
          <p style={textStyles}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelect(father); }}
              style={linkStyles}
              onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#8b3d4f'}
              onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
            >
              {father.name}
            </a>
          </p>
        </div>
      )}

      {children.length > 0 && (
        <div style={sectionStyles}>
          <span style={labelStyles}>Children</span>
          <p style={textStyles}>
            {children.map((child, idx) => (
              <span key={child.id}>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); onSelect(child); }}
                  style={linkStyles}
                  onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#8b3d4f'}
                  onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                >
                  {child.name}
                </a>
                {idx < children.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {member.biography && (
        <div style={biographyStyles}>
          <span style={labelStyles}>Biography</span>
          <p style={{ ...textStyles, marginTop: '8px', textAlign: 'justify' }}>
            {member.biography}
          </p>
        </div>
      )}

      {member.sources && member.sources.length > 0 && (
        <div style={{ ...sectionStyles, marginTop: '20px' }}>
          <span style={labelStyles}>Sources</span>
          <ul style={sourcesListStyles}>
            {member.sources.map((source, i) => (
              <li key={i} style={sourceItemStyles}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.5em',
                  width: '4px',
                  height: '4px',
                  background: '#c9a227',
                  transform: 'rotate(45deg)',
                }} />
                {source.url ? (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={linkStyles}
                    onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#8b3d4f'}
                    onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                  >
                    {source.label}
                  </a>
                ) : (
                  <span style={textStyles}>{source.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom decorative element */}
      <div style={{
        marginTop: '24px',
        textAlign: 'center',
        color: '#c9a227',
        fontSize: '1.2rem',
        letterSpacing: '0.3em',
      }}>
        * * *
      </div>
    </div>
  );
};

export default BioModal;
