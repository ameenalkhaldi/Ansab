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
      className="search-box"
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
        className="search-box__input"
      />

      {focused && query.trim() !== '' && filtered.length > 0 && (
        <div
          onWheel={(e) => e.stopPropagation()}
          className="search-box__results"
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
              onTouchStart={(e) => {
                e.preventDefault();
                const member = familyTreeData.find(p => p.id === m.id);
                if (member) onSelect(member);
                setQuery('');
                setFocused(false);
              }}
              className="search-box__result"
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
