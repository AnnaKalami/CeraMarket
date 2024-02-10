import React from 'react';
import './styles/menu.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

function Menu({ menu, setMenu }: { menu: boolean; setMenu: (arg: boolean) => void }): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.auth);
  const navigate = useNavigate()
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
          <>
          {user?.isMaster&&(
            <li>
              <a style={{ cursor: 'pointer' }} onClick={()=> navigate(`/profile/items`)}>Мои творения(хз перепишите как хотите)</a>

            </li>
          )}
          {items.map((item) => (
            <li>
              <a href={item.href}>{item.value}</a>
            </li>
          ))}
          </>
        </ul>
      </div>
      <div className="blur" />
    </div>
  );
}

export default Menu;
