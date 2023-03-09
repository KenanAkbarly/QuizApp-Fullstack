import React, { useState } from 'react'
import { Link } from 'react-scroll'
import styled from './style.module.scss'
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
const HomeHeader = () => {
const [scroll,setScroll] = useState(false)
const [sidebar, setSidebar] = useState(false);
const navigate = useNavigate()
const showSidebar = () => setSidebar(!sidebar);

window.onscroll = function(){
  let scrool = window.pageYOffset;
  if(300<scrool){
  setScroll(true)
  }else{
    setScroll(false)
  }
}
  return (
   <>
    <div style={scroll?{height:'80px', backgroundColor:'white'} :{height:'100px',backgroundColor:'#a6a6a640'}} className={styled.navbar}>
    <div className={styled.container}> 
    <div className={styled.navbar_left}>
      <Link to={''}><img src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png" alt="" />
      <h1>Quizlet</h1>
      </Link>
    </div>
    <div 
    style={scroll?{color:'black'} :{color:'white'}}
    className={styled.navbar_middle}>
    <Link to='learning' spy={true} smooth={true} offset={-100} duration={500}>Haqqımızda</Link>
    <Link to='activity' spy={true} smooth={true} offset={-100} duration={500}>Fəaliyyət</Link>
    <Link to='accesibility' spy={true} smooth={true} offset={-100} duration={500}>Əlçatanlıq</Link>
    <Link to='contact' spy={true} smooth={true} offset={-100} duration={500}>Əlaqə</Link>
    <button
    style={scroll?{color:'black'} :{color:'white'}}
    className={styled.login_btn}
      onClick={()=> {window.location.href = '/login'}}
      >
       Daxil ol
      </button>
      <button 
      style={scroll?{color:'black'} :{color:'white'}}
       className={styled.register_btn}
      onClick={()=>{window.location.href = '/register'}}>
        Qeydiyyat
      </button>
    </div>
    </div>
  </div>

  <div
  style={scroll?{height:'70px', backgroundColor:'white'} :{height:'100px',backgroundColor:'#a6a6a640'}}
  className={styled.ham_menu}>
       <div className={styled.switch_contanier}>
       <div className={styled.switch_body}>
          </div>
       </div>
        <IconContext.Provider value={{color:'#264e93'}}>
          <div  className={styled.hamburger_menu}>
            <div onClick={() => navigate('/')} className={styled.ham_menu_navbar_left}>
              <img src="https://www.shareicon.net/data/2015/08/19/87561_games_1042x1042.png" alt="" />
              <h1>Quizlet</h1>
            </div>
            <Link to='#' className={styled.menu_bars}>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? styled.active : styled.nav_menu}>
            <ul className={styled.nav_menu_items} onClick={showSidebar}>
              <li className={styled.navbar_toggle}>
                <Link to='#' className={styled.menu_bars}>
                  <AiIcons.AiOutlineClose onClick={showSidebar} />
                </Link>
              </li>
              
              <div className={styled.nav_text}>
              <Link  to='learning' spy={true} smooth={true} offset={50} duration={500}>Haqqımızda</Link>
              <Link to='activity' spy={true} smooth={true} offset={50} duration={500}>Fəaliyyət</Link>
              <Link to='accesibility' spy={true} smooth={true} offset={50} duration={500}>Əlçatanlıq</Link>
              <Link to='contact' spy={true} smooth={true} offset={50} duration={500}>Əlaqə</Link>
              <button
    
    className={styled.login_btn}
      onClick={()=> {window.location.href = '/login'}}
      >
       Daxil ol
      </button>
      <button 
      
       className={styled.register_btn}
      onClick={()=>{window.location.href = '/register'}}>
        Qeydiyyat
      </button>
              </div>
            
            </ul>
          </nav>

        </IconContext.Provider>
      </div>
   </>
  )
}

export default HomeHeader