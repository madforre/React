// import React from 'react';
// import { SampleConsumer } from '../contexts/sample';

// // 이 컴포넌트에서는 나중에 값을 받아와서 보여준다.
// // render만 필요한 경우 consumer 를 사용하는 형태로 구현
// const Receives = () => {
//     return (
//         <SampleConsumer>
//             {
//                 (sample) => (
//                     <div>
//                         현재 설정 값: { sample.state.value }
//                     </div>
//                 )
//             }
//         </SampleConsumer>
//     );
// };

// export default Receives;


// HOC 에 맞게 재작성한 경우
import React from 'react';
import { useSample } from '../contexts/sample';

const Receives = ({ value }) => {
    return (
        <div>
            현재 설정된 값 : { value }
        </div>
    );
};

export default useSample(Receives);