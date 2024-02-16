import React from 'react';
import './styles/menu.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import 'animate.css';

function Menu({ menu, setMenu }: { menu: boolean; setMenu: (arg: boolean) => void }): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.auth);
  const navigate = useNavigate();

  const header = 'МЕНЮ';

  return (
    <div
      className={`menu animate__animated ${menu ? 'animate__fadeInRight' : 'animate__backOutRight'}`}
    >
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
        <div className="Menu_container">
          <>
            {user?.isMaster && (
              <>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/profile/items`);
                    setMenu(!menu);
                  }}
                >
                  Мои изделия
                </a>

                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/profile/tasks/at-work`);
                    setMenu(!menu);
                  }}
                >
                  Мои активные заказы{' '}
                </a>
              </>
            )}
            {user && (
              <>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/tasks`);
                    setMenu(!menu);
                  }}
                >
                  Все задачи{' '}
                </a>

                {!user.isAdmin && (
                  <>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/profile/likes`);
                        setMenu(!menu);
                      }}
                    >
                      Избранное{' '}
                    </a>

                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/profile/tasks`);
                        setMenu(!menu);
                      }}
                    >
                      Мои задачи{' '}
                    </a>
                  </>
                )}
                {user.isAdmin && (
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/users`);
                      setMenu(!menu);
                    }}
                  >
                    Все пользователи{' '}
                  </a>
                )}
              </>
            )}
          </>
        </div>
      </div>

      <div
        className="blur"
        onClick={() => {
          setMenu(!menu);
        }}
      />
    </div>
  );
}

export default Menu;
