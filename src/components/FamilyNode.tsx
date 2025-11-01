import React from 'react';
import { FamilyMember } from '../data/familyTreeData';

interface Props {
  member: FamilyMember;
  hasChildren: boolean;
  isChildrenVisible: boolean;
  toggleChildren: () => void;
  onClick?: () => void;
  width: number;
  height: number;
  darkMode: boolean;
}

const FamilyNode: React.FC<Props> = ({
  member,
  hasChildren,
  isChildrenVisible,
  toggleChildren,
  onClick,
  width,
  height,
  darkMode
}) => {
  const birth = member.birthYear !== undefined ? member.birthYear : '?';
  const death = member.deathYear !== undefined ? member.deathYear : '?';

  return (
    <div
      id={member.id}
      className="family-node"
      onClick={onClick}
      style={{
        width,
        minHeight: height,
        borderColor: darkMode ? '#555' : '#999',
      }}
    >
      <div>
        <div className="family-node__name">{member.name}</div>

        <div className="family-node__years">
          {birth} – {death}
        </div>

        {member.tagline ? (
          <div className="family-node__tagline">
            {member.tagline}
          </div>
        ) : (
          <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', visibility: 'hidden' }}>
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
          className="family-node__children-toggle"
          title={isChildrenVisible ? "Hide Children" : "Show Children"}
          aria-label={isChildrenVisible ? `Hide children of ${member.name}` : `Show children of ${member.name}`}
          type="button"
        >
          {isChildrenVisible ? '➖' : '➕'}
        </button>
      )}
    </div>
  );
};

export default FamilyNode;
