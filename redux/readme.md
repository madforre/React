## Summary

* redux : actual statement package. ( store, action, reducer, dispatch )

* react-redux : connect react and redux together.

* store : globalized state.

* dispatch : execute the action and update state.

리덕스 단점 : 보일러 플레이트가 많다.

## Command

    npm install redux react-redux

## Methods

ex) let store = createStore(reducer); 

### store.getState()
    현재 스토어에있는 데이터를 반환합니다.

### store.dispatch(ACTION)
    상태값을 수정 할 때 사용되는 메소드입니다. 
    인수로는 action 이 전달됩니다. 위 컴포넌트에서는 사전에 만들어둔 increase 함수가 action 객체를 반환합니다.

### store.subscribe(LISTENER)
    dispatch 메소드가 실행되면 리스너 함수가 실행됩니다. 즉, 데이터에 변동이 있을때마다 리렌더링하도록 설정합니다.
