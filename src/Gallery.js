import React, { useState } from 'react';

const images = [
  'https://i.pinimg.com/1200x/ce/ee/cb/ceeecb35d69a11e524ef15743372fc5f.jpg',
  'https://i.pinimg.com/1200x/0d/9e/0d/0d9e0dc222bbd1dba2b7a84ea1fcd3a0.jpg',
  'https://i.pinimg.com/736x/5f/4e/b0/5f4eb07099542dcb59702cdc0e1b5ce7.jpg',
  'https://i.pinimg.com/736x/0d/73/f8/0d73f888c5e0e9505042953739404a2f.jpg',
  'https://i.pinimg.com/1200x/f4/46/9b/f4469b1e2eda1d47406c4c5e0043ccd7.jpg',
  'https://i.pinimg.com/1200x/62/7a/45/627a456c0bfbb604e96d7308280b5d07.jpg',
  'https://i.pinimg.com/1200x/e3/08/42/e30842b3bddc434de7e8b74ac5cac587.jpg',
  'https://i.pinimg.com/1200x/8f/6b/38/8f6b38d9497739fa7fd77d4190821c94.jpg',
  'https://i.pinimg.com/1200x/fd/ce/fc/fdcefc7ddca5259137b67968cf74fb80.jpg',
  'https://i.pinimg.com/1200x/d0/d6/cc/d0d6cc7cb94629db4639451edbf5f66a.jpg',
  'https://i.pinimg.com/1200x/50/0e/a3/500ea3447b1080d093f2fb8ad902fad9.jpg',
  'https://i.pinimg.com/1200x/6e/d1/72/6ed17241728bb641d65b895287777260.jpg',
];

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <>
      <div className="gallery-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        transition: 'all 0.3s',
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="card gallery-item"
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s',
            }}
            onClick={() => setOpenIdx(i)}
          >
            <img
              src={src}
              alt={`Шторы ${i+1}`}
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                display: 'block',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(44,62,80,0.07)',
                margin: '0 auto',
                transition: 'all 0.3s',
                background: '#fff',
              }}
            />
          </div>
        ))}
      </div>
      {openIdx !== null && (
        <div className="gallery-modal" onClick={() => setOpenIdx(null)}>
          <img
            src={images[openIdx]}
            alt={`Шторы ${openIdx+1}`}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
} 