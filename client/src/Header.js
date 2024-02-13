import * as React from 'react';
import logo from "./images/Logo_esilv_png_blanc.png";

function Header() {
    return (
        <img style={{display:'flex', alignSelf: 'center'}} src={logo} width={150} height={150}/>
    );
  }
  export default Header;