import { ActionTypes } from '../actions';

const initialStates = {
  offers: [],
  sectionOffers: [],
  isLoading: false,
  errorMessage: '',
  offset: 1
};

const _processSectionList = datas => {
  const sectionList = [];
  let sectionItem = {
    title: 'Section 1',
    data: []
  };
  datas.forEach(item => {
    if (sectionItem.data.length < 10) {
      sectionItem.data.push(item);
    } else {
      sectionList.push(sectionItem);
      sectionItem = {
        title: `Section ${sectionList.length + 1}`,
        data: [item]
      };
    }
  });
  if (sectionItem.data.length !== 0) {
    sectionList.push(sectionItem);
  }
  return sectionList;
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFER:
      return {
        ...state,
        offers: action.offers,
        sectionOffers: _processSectionList(action.offers),
        offset: action.offset,
        isLoading: false
      };
    case ActionTypes.LOAD_MORE_OFFER:
      return {
        ...state,
        offset: action.offset,
        isLoading: false,
        offers: state.offers.concat(action.data)
      };
    case ActionTypes.FETCH_OFFER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
    case ActionTypes.FETCH_OFFER_LOADING:
      return {
        ...state,
        isLoading: action.loading
      };
    case ActionTypes.RESET_OFFER:
      return {
        ...initialStates
      };
  }
  return state;
};
