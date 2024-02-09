import React from 'react';
import './styles/menu.scss';

function Menu({ menu, setMenu }: { menu: boolean; setMenu: (arg: boolean) => void }): JSX.Element {
  const header = 'Крутая менюшка';
  const items = [
    { href: '/', value: 'блабла' },
    { href: '/', value: 'блабла' },
  ];
  return (
    <div className="menu">
      <div className="menu_content">
        <div className="menu_header">
          <button
            type="button"
            className="arrow-button2"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            〉
          </button>
          {header}
        </div>
        <ul>
          {items.map((item) => (
            <li>
              <a href={item.href}>{item.value}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="blur" />
    </div>
  );
}

export default Menu;
