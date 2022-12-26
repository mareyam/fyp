import React from 'react';

const App = () => {
  const data = [    { id: 1, name: 'Item 1' },    { id: 2, name: 'Item 2' },    { id: 3, name: 'Item 3' },    { id: 4, name: 'Item 4' },    { id: 5, name: 'Item 5' },    { id: 6, name: 'Item 6' },    { id: 7, name: 'Item 7' },    { id: 8, name: 'Item 8' },    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },,    { id: 9, name: 'Item 9' },  ];

  return (
    <div style={{ width: '300px', overflowX: 'scroll' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map(item => (
          <div key={item.id} style={{ width: '100px', height: '100px' }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
