import { Button, Divider, Form, Input, Select,  Card, Typography,List,Icon} from 'antd';
import React, { Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
import { CardListItemDataType } from '../../../list/card-list/data';
import styles1 from './style.less';

const { Paragraph } = Typography;
const { Option } = Select;
const a = true;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const c = ( <div className={styles.cardList}>
<List<Partial<CardListItemDataType>>
  rowKey="id"
  // loading={null}
  grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
  dataSource={[{description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",id: "fake-list-1", owner: "曲丽丽", title: "Angular", avatar: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", cover: "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png"},
  {description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标",id: "fake-list-2", owner: "林东东", title: "Ant Design", avatar: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", cover: "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"},
  {description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",id: "fake-list-2", owner: "林东东", title: "Ant Design", avatar: "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", cover: "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"}, 
]}
  renderItem={item => {
    if (item && item.id) {
      return (
        <List.Item key={item.id}>
          <Card
            hoverable
            className={styles1.card}
            actions={[]}
          >
            <Card.Meta
              avatar={<img alt="" className={styles1.cardAvatar} src={item.avatar} />}
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles1.item} ellipsis={{ rows: 3 }}>
                  {item.description}
                </Paragraph>
              }
            />
          </Card>
        </List.Item>
      );
    }
    return (
      <List.Item>
        <Button type="dashed" className={styles1.newButton}>
          <Icon type="plus" /> 新增产品
        </Button>
      </List.Item>
    );
  }}
/>
</div>)

const Step1: React.FC<Step1Props> = props => {
  const { form, dispatch, data } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    validateFields((err: any, values: StateType['step']) => {
      if (!err && dispatch) {
        dispatch({
          type: 'stepForm1/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'stepForm1/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };
  return (
    <div>
      {c}
 <div style={{textAlign:"center"}}>
    <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </div>  </div>
  );
};

export default connect(({ stepForm1 }: { stepForm1: StateType }) => ({
  data: stepForm1.step,
}))(Form.create<Step1Props>()(Step1));
