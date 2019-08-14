import { Card, Steps } from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import styles from './style.less';

const { Step } = Steps;

interface StepForm1Props {
  current: StateType['current'];
}

@connect(({ stepForm1 }: { stepForm1: StateType }) => ({
  current: stepForm1.current,
}))
class StepForm1 extends Component<StepForm1Props> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 3;
      case 'js':
        return 2
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step4 />;
    } else if(currentStep === 3){
      stepComponent = <Step3 />;
    }else{
      stepComponent = <Step1 />
    }
    return (
      <PageHeaderWrapper content="">
        <Card bordered={false}>
          <>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="选择供应商" />
              <Step title="选择运输方" />
             
              <Step title="选择接收单位"/>
               <Step title="完成"/>
            </Steps>
            {stepComponent}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default StepForm1;
