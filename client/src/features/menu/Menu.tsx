import React from 'react';
import './styles/menu.scss';

function Menu ({header, items}) {
    return (
       <div className = 'menu'>
        <div className='blur'>
            <div className='menu_header'>{header}</div>
            <ul>{items.map (item => 
                <li>
                    <a href = {item.href}>{item.value}</a>
                </li>
                )}</ul>        
        </div>

       </div>>
    )
}


export default Menu;