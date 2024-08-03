/* eslint-disable react/prop-types */

import { menu_list } from '../../assets/assets'
import  './Exploremenu.css'

function Exploremenu({category,setcategory}) {
  return (
<div id="explore-menu" className="exploremenu">
<h1>Explore our menu</h1>
<p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolores corrupti atque sunt adipisci. Reprehenderit recusandae possimus veritatis assumenda minus, ratione neque aut quidem doloribus, similique a, esse eum ipsam!</p>
<div className="explore-menu-list">
  {menu_list.map((item,index)=>(
    <div onClick={() => setcategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
      <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
      <p>{item.menu_name}</p>
    </div>
  ))}
  </div>
  <hr />

</div>
  )
}

export default Exploremenu
