import React from 'react';
import familyTreeData, { FamilyMember } from '../data/familyTreeData';

interface Props {
  member: FamilyMember;
  onClose: () => void;
  onSelect: (member: FamilyMember) => void;
}

const BioModal: React.FC<Props> = ({ member, onClose, onSelect }) => {
  const father = familyTreeData.find(m => m.id === member.fatherId);
  const children = familyTreeData.filter(m => m.fatherId === member.id);

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="bio-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} biography`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <h2 style={{ margin: 0 }}>{member.name}</h2>
        <button onClick={onClose} className="bio-modal__close" aria-label="Close biography">✖</button>
      </div>

      {(member.birthYear || member.deathYear) && (
        <p className="bio-modal__section"><strong>Life:</strong> {member.birthYear ?? '—'} – {member.deathYear ?? '—'}</p>
      )}

      {father && (
        <p className="bio-modal__section"><strong>Father:</strong>{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onSelect(father); }}>
            {father.name}
          </a>
        </p>
      )}

      {children.length > 0 && (
        <p className="bio-modal__section"><strong>Children:</strong>{' '}
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
        <div className="bio-modal__section">
          <strong>Biography:</strong>
          <p>{member.biography}</p>
        </div>
      )}

      {member.sources && member.sources.length > 0 && (
        <div className="bio-modal__section bio-modal__links">
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
    </div>
  );
};

export default BioModal;
