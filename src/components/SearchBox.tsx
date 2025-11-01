import React, { useState } from 'react';
import familyTreeData from '../data/familyTreeData';

interface SearchBoxProps {
  onSelect: (member: typeof familyTreeData[0]) => void;
}

const MAX_RESULTS = 10;

const SearchBox: React.FC<SearchBoxProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = familyTreeData
    .filter(m =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.id.toLowerCase() === query.toLowerCase()
    )
    .slice(0, MAX_RESULTS);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (filtered.length > 0) {
        onSelect(filtered[0]);
        setQuery('');
        setFocused(false);
      }
    }
  };

  return (
    <div
      style={{ position: 'relative', width: 250 }}
      onBlur={() => setTimeout(() => setFocused(false), 150)}
    >
      <input
        type="text"
        placeholder="Search Name or ID"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setFocused(true);
        }}
        onKeyDown={handleEnter}
        onFocus={() => setFocused(true)}
        style={{ width: '100%', padding: '6px', borderRadius: 4 }}
      />

      {focused && query.trim() !== '' && filtered.length > 0 && (
        <div
          onWheel={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: 200,
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #ccc',
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {filtered.map(m => (
            <div
              key={m.id}
              onMouseDown={() => {
                const member = familyTreeData.find(p => p.id === m.id);
                if (member) onSelect(member);
                setQuery('');
                setFocused(false);
              }}
              style={{
                padding: '6px 8px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
            >
              {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
