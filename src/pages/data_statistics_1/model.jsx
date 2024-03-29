import { fakeChartData } from './service';

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
};
const Model = {
  namespace: 'dataStatistics1',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      console.log("@20 fetch")
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchSalesData(_, { call, put }) {
      console.log("@29 fetchsaledata")
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      console.log("@41", payload)
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
