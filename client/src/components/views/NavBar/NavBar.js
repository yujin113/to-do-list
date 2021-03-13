import React from 'react'
import { withRouter } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <div>
            <ul className="nav_container1">
                <li className="mainMenu"><a href="http://localhost:3000/main">Main Page</a>
                    <ul id="nav_container2">
                        <li className="subMenu"><a href="http://localhost:3000/main">일상</a></li>
                        <li className="subMenu"><a href="http://localhost:3000/main">공부</a></li>
                        <li className="subMenu"><a href="http://localhost:3000/main">취미</a></li>
                    </ul>
                </li>
                <li className="mainMenu"><a href="http://localhost:3000/my">My Page</a></li>
                <li className="mainMenu"><a href="http://localhost:3000/">로그아웃</a></li>
                <li className="mainMenu"><a href="http://localhost:3000/open"><b>!!!</b></a></li>
            </ul>
        </div>
    )
}

export default withRouter(NavBar)
