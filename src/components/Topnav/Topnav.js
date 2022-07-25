import React from 'react'
import Dropdwon from '../dropdown/Dropdwon'
import './Topnav.css'
import notification from '../../assets/jsonData/notification.json'
import { Link } from 'react-router-dom'
import user_image from '../../assets/images/zaid_profile.jpg'
import user_menu from '../../assets/jsonData/users-menu.json'

const curr_user = {
  display_name:'zaid nagori',
  image:user_image
}
const Logout = () => {
  localStorage.removeItem("user")
  window.location.reload(false);
}
const renderUserToggle = (user) =>(
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="user_image" />
      </div>
      <div className="topnav__right-user__name">
     {user.display_name}
      </div>
  </div>
)

const rendernotificationItems = (item ,index) => (
  <div className="notification-item"  key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
  </div>
)
const renderUserMenu = (item ,index) => (
 <Link to='/' key={index}>
 <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
  </div>
 </Link>
)

const Topnav = () => {
 
  return (
    <div className='topnav'>
        {/* <div className="topnav__search">
          <input type="text" placeholder='Search here...' />
          <i className='bx bx-search'></i>
        </div> */}
        <h1>Chennai Open</h1>
        <div className="topnav__right">
          <div className="topnav__right-item">
                   {/* <Dropdwon
                   customToggle={() =>renderUserToggle(curr_user) }
                   contentData={user_menu}
                   renderItems={(item,index) => renderUserMenu(item,index)}
                   /> */}
                   <button onClick={Logout} className="button__table">Logout</button>
          </div>
          {/* <div className="topnav__right-item">
                   <Dropdwon 
                   icon='bx bx-bell'
                   badge ='12'
                   contentData={notification}
                   renderItems={(item,index) => rendernotificationItems(item ,index)}
                   renderFooter={() => <Link to='/'>View All</Link>}
                    />
          </div> */}
          <div className="topnav__right-item">
                   <Dropdwon />
          </div>
        </div>
    </div>
  )
}

export default Topnav
