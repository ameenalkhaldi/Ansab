import React from 'react';
import { FamilyMember } from '../data/familyTreeData';

interface Props {
  member: FamilyMember;
  hasChildren: boolean;
  isChildrenVisible: boolean;
  toggleChildren: () => void;
  onClick?: () => void;
}

const FamilyNode: React.FC<Props> = ({
  member,
  hasChildren,
  isChildrenVisible,
  toggleChildren,
  onClick
}) => {
  const birth = member.birthYear !== undefined ? member.birthYear : '?';
  const death = member.deathYear !== undefined ? member.deathYear : '?';

  return (
    <div
      id={member.id}
      className="family-node"
      onClick={onClick}
      style={{
        width: 200,
        minHeight: 100,
        border: '1px solid #999',
        borderRadius: 8,
        padding: 10,
        background: '#fff',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontWeight: 'bold' }}>{member.name}</div>

        <div style={{ fontSize: '0.85em', color: '#555' }}>
          {birth} – {death}
        </div>

        {member.tagline ? (
          <div style={{
            marginTop: 4,
            fontSize: '0.8em',
            fontStyle: 'italic',
            color: '#777',
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
          style={{
            marginTop: 8,
            borderRadius: '50%',
            width: 24,
            height: 24,
            fontSize: '14px',
            border: 'none',
            background: '#eee',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            lineHeight: 1,
            alignSelf: 'center'
          }}
          title={isChildrenVisible ? "Hide Children" : "Show Children"}
        >
          {isChildrenVisible ? '➖' : '➕'}
        </button>
      )}
    </div>
  );
};

export default FamilyNode;
