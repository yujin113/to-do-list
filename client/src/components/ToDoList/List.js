import React, { Component } from 'react';
import TodoListTemplate from './TodoListTemplate';
import Form from './Form';
import TodoItemList from './TodoItemList';
import axios from 'axios';

//localStorage로부터 login할때 저장한 userId 가져오기
//const currentUserId = localStorage.getItem('userId');

class List extends Component {
  
  id = 0; // id 0으로 초기화.
 
  state = {
    input: '',
    //writer: { _id: xx },
    category: '',
    todos: []
  }

  //server로 정보 전송하는 함수 - (새로 생성할 때 & 체크 & 지우기 & 공개 설정) 후에 동작
  PostToServer = () => {
    const {input, writer, category, todos} = this.state;

    console.log({input, writer, category, todos});

    
    // private 바뀌는지 테스트
    //if(todos[0].private){console.log('비공개');} else {console.log('공개');}

    //변화가 있는 todos만 보내는건지 state에 존재하는 todos 모두 보내는지?

    let body = {
      input: input,
      //writer: writer,
      category: category,
      todos: todos
    }
    axios.post('', {
      input: '',
      //writer: { _id: writer._id },
      category: category,
      todos: [{
        id: todos.id,
        text: todos.text,
        date: todos.date,
        chekced: todos.chekced
      }]
    }).then(response => { 
      console.log(response);
      //화면 렌더링할때 저장된 list 그대로 출력.
    })
  }

  //GetFromServer = () => {

  //}

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  // listitem 생성하는 함수.
  handleCreate = () => {
    const { input, todos } = this.state;
    const date = new Date();

    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        date: date,
        category: this.props.category,
        checked: false,
      })
    }, function() {this.PostToServer()});

    //console.log(this.state);
    console.log(this.props);

    //this.PostToServer();
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  // 체크하기/체크풀기
  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    }, function() {this.PostToServer()});

    
  }

  //아이템 제거하기
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    }, function() {this.PostToServer()});
  }


  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    );
  }
}

export default List