import React from 'react'
import'./sidebar.css'

import Logo from '../../assets/images/logo.jpg';
import sidebar__item from '../../assets/jsonData/sidebar-routes.json';
import { Link ,useLocation} from 'react-router-dom';

const SidebarItem = props =>{
  const active = props.active ? 'active' : '';
  return (
     <div className="sidebar__item">
       <div className={`sidebar__item-inner ${active}`}>
           <i className={props.icon}></i>
           <span>{props.title}</span>
         
       </div>
     </div>

  )
  
}

const Sidebar = () => {
  let location = useLocation();
  const activeItem = sidebar__item.findIndex(item => item.route === location.pathname);
  return (
   
  
      <div className="sidebar">
        <div className="sidebar__logo">
          <img src={Logo} alt="company logo" />
        </div>
       {
          sidebar__item.map((item,index)=>(
            <Link to={item.route} key={index}>
              <SidebarItem 
              title={item.display_name}
              icon ={item.icon}
              active={index === activeItem}
               />
            </Link>
            
          ))
       }
       <div className="sidebar-footer">
        <p>Design by Skilliza 2021-22</p>
       </div>
      </div>
   
  )
}

export default Sidebar
