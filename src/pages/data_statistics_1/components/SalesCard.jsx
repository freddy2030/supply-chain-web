import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { Bar } from './Charts';
import styles from '../style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const rankingListData = [];

const storename = ['玛沃尔', '尚欧', '天天超市', '小明杂货铺', ''];

for (let i = 0; i < 4; i += 1) {
  rankingListData.push({
    title: formatMessage(
      {
        id: storename[i],
      },
      {
        no: i,
      },
    ),
    total: 14992-i*623,
  });
}

const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  loading,
  selectDate,
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding: 0,
    }}
  >
    <div className={styles.salesCard}>
      <Tabs
        tabBarExtraContent={
          <div className={styles.salesExtraWrap}>
            <div className={styles.salesExtra}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                <FormattedMessage
                  id="data_statistics_1.analysis.all-day"
                  defaultMessage="All Day"
                />
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                <FormattedMessage
                  id="data_statistics_1.analysis.all-week"
                  defaultMessage="All Week"
                />
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                <FormattedMessage
                  id="data_statistics_1.analysis.all-month"
                  defaultMessage="All Month"
                />
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                <FormattedMessage
                  id="data_statistics_1.analysis.all-year"
                  defaultMessage="All Year"
                />
              </a>
            </div>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{
                width: 256,
              }}
            />
          </div>
        }
        size="large"
        tabBarStyle={{
          marginBottom: 24,
        }}
      >
        <TabPane
          tab={<FormattedMessage id="data_statistics_1.analysis.sales" defaultMessage="Sales" />}
          key="sales"
        >
          <Row type="flex">
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={295}
                  title={
                    <FormattedMessage
                      id="data_statistics_1.analysis.sales-trend"
                      defaultMessage="Sales Trend"
                    />
                  }
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="data_statistics_1.analysis.sales-ranking"
                    defaultMessage="Sales Ranking"
                  />
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span className={styles.rankingItemValue}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={<FormattedMessage id="data_statistics_1.analysis.visits" defaultMessage="Visits" />}
          key="views"
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Bar
                  height={292}
                  title={
                    <FormattedMessage
                      id="data_statistics_1.analysis.visits-trend"
                      defaultMessage="Visits Trend"
                    />
                  }
                  data={salesData}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <h4 className={styles.rankingTitle}>
                  <FormattedMessage
                    id="data_statistics_1.analysis.visits-ranking"
                    defaultMessage="Visits Ranking"
                  />
                </h4>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <span>{numeral(item.total).format('0,0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default SalesCard;
