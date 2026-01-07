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

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 60,
        left: 0,
        bottom: 0,
        width: 320,
        padding: 16,
        background: '#fff',
        borderRight: '1px solid #ccc',
        overflowY: 'auto',
        zIndex: 25,
      }}
    >
      <button onClick={onClose} style={{ float: 'right', fontSize: '1.2rem' }}>✖</button>
      <h2 style={{ marginTop: 0 }}>{member.name}</h2>

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
    </div>
  );
};

export default BioModal;
