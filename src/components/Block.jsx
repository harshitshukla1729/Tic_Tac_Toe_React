import React from 'react';

export default function Block({value,onClick,index}) {
  return <div id={index} onClick={onClick} className="block">{value}</div>;
}
