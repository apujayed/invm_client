import React, { useRef, useState } from "react";
import { NavLink, Link,useLocation } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);
  const path = useLocation().pathname;
  const routePath = useLocation().pathname.split('/')[1];
  const newPA = `/`+routePath;

  return (
    <li onClick={props.onClick}>
      <Link
        exact
        to={to}
        // onClick={() => {
        //   setExpand((e) => !e);
        // }}
        className={newPA==to?`menu-item active`:`menu-item`}
      >
        <div className="menu-icon">
          <i className={iconClassName}></i>
        </div>
        <span>{name}</span>
      </Link>
      {subMenus && subMenus.length > 0 ? (
        <ul  className={newPA==to?`sub-menu active`:`sub-menu`}>
          {subMenus.map((menu, index) => (
            <li  className={path==menu.to?`active`:``} key={index} >
              <NavLink to={menu.to}>{menu.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuItem;
