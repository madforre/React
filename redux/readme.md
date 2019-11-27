## Summary

* redux : actual statement package. ( store, action, reducer, dispatch )

* react-redux : connect react and redux together.

* store : globalized state.

* dispatch : execute the action and update state.

리덕스 단점 : 보일러 플레이트가 많다.

## Three Core Concepts

    ex) Cake Shop (Cake Shop Scenario / Redux / Purpose)

* Shop / Store / Holds the state of your application.
* Intention to BUY_CAKE / Action / Describes what happened.
* Shopkeeper / Reducer / Ties the store and actions together.

A store that holds the state of your application.
An action that describes the changes in the state of the application.
A reducer which actually carries out the state transition depending on the action.

## Three Principles

1. "The state of your whole application is stored in an object tree within a single store"

    Maintain our application state in a single object which would be managed by the Redux store.

2. "The only way to change the state is to emit an action, an object describing what happened"

    To update the state of your app, you need to let Redux know about that with an action.
    Not allowed to directly update the state object.

3. "To specify how the state tree is transformed by actions, you write pure reducers"

    Reducer - {previousState, action} => newState

    state를 액션에 의해 전송하기위해 구체화한다.
    switch 문을 통해서 케이스를 분류하여 리듀서를 작성한다.

    ex) Reducer is the shopkeeper

* Redux 작동 방식.

    __JS App__ - dispatch - __Action__ - __Reducer__ - __Redux Store(State)__ - subscribed - __JS App__

* Action
    
    액션은 타입 속성이 설정되있어야 하고, 자바스크립트 객체여야한다.
    Store와 상호작용할 수 있는 유일한 방법이다.
    타입 이름은 string 상수로 주로 정의된다.

* Reducers

    리듀서는 상태와 액션을 인자로 받은 다음에 애플리케이션의 다음 상태를 리턴한다.

* Store

    전체 애플리케이션을 위한 하나의 저장 창고.

    애플리케이션 상태를 저장한다.
    getState로 상태에 접근한다.
    dispatch로 액션을 업데이트한다.
    subscribe로 리스너를 등록한다.
    등록되지 않은 리스너들은 subscribe를 통해 리턴되는 함수를 통해 다룬다.

    리덕스 스토어를 구독한다는 것은 리덕스 스토어의 상태가 바뀔 때마다 특정 함수를 실행한다는 의미이다.

## Command

    npm install redux react-redux

## Methods

ex) let store = createStore(reducer); 

### store.getState()
    현재 스토어에있는 데이터를 반환합니다.

### store.dispatch(ACTION)
    상태값을 수정 할 때 사용되는 메소드입니다. 
    인수로는 action 이 전달됩니다.
    
### store.subscribe(LISTENER)
    dispatch 메소드가 실행되면 리스너 함수가 실행됩니다. 즉, 데이터에 변동이 있을때마다 리렌더링하도록 설정합니다.


## Middleware

    Is the suggested way to extend Redux width custom functionality

    미들웨어는 리덕스를 확장하는데 제안되는 방법이다.

    Provides a third-party extension point between dispatching an action, and the moment it reaches the reducer

    써드파티 확장 포인트를 제공한다. 액션을 급파(디스패치)할 때와 리듀서에 도달한 순간 사이에.

    Use middleware for logging, crash reporting, performing asynchronous tasks etc

    로깅과 에러 리포팅과, 비동기 작업을 수행하는데 쓰인다.

        ex) redux-logger (npm install redux-logger), 

            import apply Middleware. 패키지 설치 후 리덕스 로거를 import 한다.
            createStore 할 때 인자에 applyMiddleware 메서드로 logger를 감싸고 전해주면 
            리덕스 로거 사용 가능. - 옵션 설정, 설치 등 자세한건 패키지 공식 git 문서 참조.

    
    일반적으로 Synchronous Actions(동기 액션들)은 디스패치 되었을 때(액션을 급파 했을 때)에 이전 상태가 새로운 상태로 즉시 업데이트 된다.

        예) BUY_CAKE, BUY_ICECREAM 액션 등등을 디스패치하면, numOfCakes의 숫자는 바로 1개가 감소한다. 

    그렇다면 Async Actions 인 경우는?

        Asynchronous API calls to fetch data from an end point and use that data in your application.

        리덕스에서 비동기 액션들을 API 끝점에서 데이터를 가져와 붙이고 데이터를 애플리케이션에 사용해보자.

        비동기 애플리케이션 작성 요령.

            State

                // state object.

                state = {
                    loading: true,
                    data: [],
                    error: ''
                }

                // loading - Display a loading spinner in your component
                // data - List of users
                // error - Error message.

                // that is our state object.

            Actions

                three methods.

                FETCH_USERS_REQUEST - Fetch list of users.

                FETCH_USERS_SUCCESS - Fetched successfully.

                FETCH_USERS_FAILURE - Error fetching the data.

                we have three actions.

            Reducers

                case: FETCH_USERS_REQUEST
                    loading: true

                case: FETCH_USERS_SUCCESS
                    loading: false
                    users: data ( from API )

                case: FETCH_USERS_FAILURE
                    loading: false
                    error: error ( from API )
        
        이제 리덕스로 API 콜을 어떻게 처리할까??
        다음의 두가지 패키지 설치가 필요하다.

            1. axios.

                Reuqests to an API end point

            2. redux-thunk.

                Define async axction creators

                리덕스 텅크 라이브러리는 기본적으로 Middleware이다. 이것을 store에 apply 적용할 것이다.

            npm install axios redux-thunk

        redux thunk middleware를 임포트 한 다음에 create store function 에 적용하여 사용한다.

            ex) const store = createStore(reducer, applyMiddleware(thunkMiddleware))

        일반적으로 디스패치 시에는 인자부분에 해당 액션크리에이터 함수를 실행하여 액션 객체를 리턴하는 식으로 한다.
        비동기 액션을 디스패치 할 때는 액션 크리에이터를 액션 객체 대신 함수를 리턴하도록 작성 후 redux-thunk 미들웨어를 리듀서로 사용.

        리턴하는 함수 안에서 일반적인 액션들을 dispatch 할 수 있다. (리듀서에 의해 다뤄지는 액션들.)
        이렇듯 데이터가 패치되는 흐름과 이러한 컨셉을 꼭 기억하자!

## 컨셉 정리

    Redux Store (State)는 JavaScript App에 구독되고 있다.

    App에서 직접 Redux Store를 변경할 수 없다.
    따라서 디스패치를 통해서 상태를 변경하는 액션들을 처리한다.
    이 액션들은 리듀서가 다룬다. 리듀서는 이전 상태를 다음 상태로 변경(다음상태를 리턴)한다.
    
    앱은 리덕스 스토어를 구독하고 있다. 구독중인 경우, 리덕스 스토어의 상태가 바뀔 때 특정 함수를 실행한다.

## React Redux + Hooks

    React Redux pattern?

    Action creators, reducers, provide the store and connect the components.

    Components can access state and dispatch actions

    React Hooks와 같이 사용한다면 부수 효과를 줄일 수 있다.
    리액트에서는 HOC를 대체할 수 있는 Hooks API를 제공한다.