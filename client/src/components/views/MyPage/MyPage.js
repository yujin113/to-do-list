import React, {usestate} from 'react';
import './MyPage.css';
import { withRouter } from 'react-router-dom';
import List from '../CheckList/List';
//import ImgUploadForm from '../../ImgUploadFrom/ImgUploadForm';
//import NavBar from './components/views/NavBar/NavBar';


function MyPage(props) {

    const currentUsername = localStorage.getItem('userName');
    console.log(currentUsername);

    return (
        <div className="myPage_container">      
            <div className="myPage_item">
                 
                <span> {currentUsername/*userName*/}의</span> to do list
            </div>
            <div className="myPage_item">달력</div>
            <div className="myPage_item">달성률</div>
            <div className="myPage_item">목표</div>
            <div className="myPage_item">
                <List />
            </div>
            <div className="myPage_item">
                <List />
            </div>
            <div className="myPage_item">
                <List />
            </div>
        </div>
    )

}

export default withRouter(MyPage)