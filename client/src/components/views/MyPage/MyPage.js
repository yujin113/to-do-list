import React, {usestate} from 'react';
import './MyPage.css';
import { withRouter } from 'react-router-dom';
import List from '../../ToDoList/List';
import ImageUploader from '../../ImgUploadForm/ImgUploadForm';
//import NavBar from './components/views/NavBar/NavBar';


function MyPage(props) {

    const currentUsername = localStorage.getItem('userName');
    //console.log(currentUsername);

    return (
        <div className="myPage_container">      
            <div className="myPage_item">
                <span style={{width: '20px', height: '20px'}} key="upload"><ImageUploader/></span> 
                <span> {currentUsername/*userName*/}의</span> to do list
            </div>
            <div className="myPage_item">달력</div>
            <div className="myPage_item">달성률</div>
            <div className="myPage_item">목표</div>
            <div className="myPage_item">
                <div>일상</div>
                <List category="일상"/>
            </div>
            <div className="myPage_item">
                <div>공부</div>
                <List category="공부"/>
            </div>
            <div className="myPage_item">
                <div>취미</div>
                <List category="취미"/>
            </div>
        </div>
    )

}

export default withRouter(MyPage)