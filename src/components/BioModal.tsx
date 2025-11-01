import React from 'react';
import familyTreeData, { FamilyMember } from '../data/familyTreeData';

interface Props {
  member: FamilyMember;
  onClose: () => void;
  onSelect: (member: FamilyMember) => void;
  darkMode?: boolean;
}

const BioModal: React.FC<Props> = ({ member, onClose, onSelect, darkMode = false }) => {
  const father = familyTreeData.find(m => m.id === member.fatherId);
  const children = familyTreeData.filter(m => m.fatherId === member.id);

  return (
    <div
      className={`bio-modal-backdrop ${darkMode ? 'dark' : ''}`}
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onClick={onClose}
    >
      <aside
        className="bio-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${member.id}-bio-heading`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bio-modal-header">
          <h2 id={`${member.id}-bio-heading`}>{member.name}</h2>
          <button onClick={onClose} className="bio-modal-close" aria-label="Close biography">
            ✖
          </button>
        </header>

        {(member.birthYear || member.deathYear) && (
          <p><strong>Life:</strong> {member.birthYear ?? '—'} – {member.deathYear ?? '—'}</p>
        )}

        {father && (
          <p><strong>Father:</strong>{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSelect(father); }}>
              {father.name}
            </a>
          </p>
        )}

        {children.length > 0 && (
          <p><strong>Children:</strong>{' '}
            {children.map((child, idx) => (
              <span key={child.id}>
                <a href="#" onClick={(e) => { e.preventDefault(); onSelect(child); }}>
                  {child.name}
                </a>{idx < children.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

        {member.biography && (
          <div style={{ marginTop: 12 }}>
            <strong>Biography:</strong>
            <p>{member.biography}</p>
          </div>
        )}

        {member.sources && member.sources.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>Sources:</strong>
            <ul style={{ paddingLeft: 18 }}>
              {member.sources.map((source, i) => (
                <li key={i}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
};

export default BioModal;
