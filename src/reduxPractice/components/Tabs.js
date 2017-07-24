import React from 'react';

const tabList = [
  'lorem djfklen dlinl ijslo eilns ejll eilisen, eilsij',
  'shanepdk ijel oe jl eohjiwl dijljepi er to kdenl eilsij',
  'lorem ekdisl eild fnihelwp difnw eilsij!'
];

const Tabs = ({
  focused,
  changeTab
}) => (
  <ul>
    {tabList.map((tab, i) => (
      <li
        key={`tabList${i}`}
        onClick={() => changeTab(i)}
      >
        <p>#{i}</p>
        <p style={{
          display: i === focused ? 'block' : 'none'
        }}>{tab}</p>
      </li>
    ))}
  </ul>
);

export default Tabs;
