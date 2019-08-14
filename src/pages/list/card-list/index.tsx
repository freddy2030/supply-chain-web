import { Button, Card, Icon, List, Typography } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface CardListProps {
  listCardList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

@connect(
  ({
    listCardList,
    loading,
  }: {
    listCardList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listCardList,
    loading: loading.models.list,
  }),
)
class CardList extends Component<
  CardListProps,
  CardListState
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listCardList/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      listCardList: { list },
      loading,
    } = this.props;
    console.log("@577-----",loading,list)
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          这里有所有人的订单
        </p>
        <div className={styles.contentLink}>
          <Button style={{textAlign:"center", height:25, marginTop:10}}><p style={{textAlign:"center", marginTop:0}}>金属</p></Button>
          <Button style={{textAlign:"center", height:25, marginTop:10, marginLeft:20}}><p style={{textAlign:"center", marginTop:0}}>医疗用品</p></Button>
          <Button style={{textAlign:"center", height:25, marginTop:10, marginLeft:20}}><p style={{textAlign:"center", marginTop:0}}>美容化妆</p></Button>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[nullData, ...list]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <div>
                          <Paragraph className={styles.item} ellipsis={{ rows: 1 }}>
                            {item.description}
                          </Paragraph>
                          <Paragraph className={styles.item} ellipsis={{ rows: 1}}>
                           订单金额： 1232300
                        </Paragraph>
                        </div>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新建订单
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
