import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const { payAccount, receiverAccount, receiverName, amount } = data;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'stepForm1/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="付款账户"> 3NPXVjoYy1jd4Y2Bzt6akamGpmpiu8NQSU</Descriptions.Item>
        <Descriptions.Item label="收款账户"> 3LZWRarCJSKh47JSM1FT7zMjgdmJp9pYQw</Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        创建新订单
      </Button>
      <Button>查看详情</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="等待商户确认"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ stepForm1 }: { stepForm1: StateType }) => ({
  data: stepForm1.step,
}))(Step3);
