import React from 'react';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';
import { SampleProvider } from './contexts/sample';

const App = () => {
  return (
    // Context 를 프로젝트에 적용하려면, 앱을 Provider 로 감싸주어야 한다.
    <SampleProvider>
      <div className="panes">
        <LeftPane />
        <RightPane />
      </div>
    </SampleProvider>
  );
};

export default App;
