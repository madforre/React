// 파일을 쪼개는 경우 꼭 적어줘야할 코드들
const React = require('react')
const { Component } = React
//


let n = 0;

class WordChainClass extends Component {
    state = {
        // 바뀌는 거를 state로 만드는 생각은 항상 기본이다.
        word: '첫단어',
        value: '',
        message: ''
    };

    onSubmitForm = (e) => {
        e.preventDefault()

        // 2-3글자 아니면 함수 종료
        let re = /[가-힣]{3}/
        if (this.state.value.length === 2) re = /[가-힣]{2}/

        if (!re.test(this.state.value)) { 
            this.setState({ message: '2-3글자의 완성된 단어를 입력하세요.' })
            this.answer_input.focus()
            return
        }

        // 제시한 문제의 마지막 글자와 내가 입력한 첫글자 비교
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                value: '',
                word: this.state.value,
                message: '딩동댕'
            })
        } else {
            this.setState({
                value: '',
                message: '땡'
            })
        }
        this.answer_input.focus()
    }

    onChangeInput = (e) => {
        const words = e.currentTarget.value;
        this.setState({value: words})
        
        // 문자가 4글자 넘어가는 경우 삭제할꺼임. 그리고 2글자~3글자만 입력하도록 경고문 띄울꺼임
        if (words.length == 4) {
            const sliced_words = words.slice(0, -1)
            this.setState({value: sliced_words, message: '3글자까지밖에 안댐'})
        } else if (words.length < 2) {
            this.setState({message: '2글자 이상 입력하렴', value: words})
        } else {
            this.setState({message: '', value: words})
        }
    }

    onRefInput = (el) => {
        this.answer_input = el
    };

    render() {
        n++;
        console.log('랜더링 횟수 : ', n)
        return (
            <>
                <p>{this.state.word}</p>
                <form onSubmit={this.onSubmitForm}>
                    <input id="answer" type="text" ref={this.onRefInput}
                        onChange={this.onChangeInput} value={this.state.value} />
                    <button>입력!!!</button>
                </form>
                <p>{this.state.message}</p>
            </>
        )
    }
}

// 파일을 쪼개는 경우 꼭 적어줘야할 코드
module.exports = WordChainClass
// 