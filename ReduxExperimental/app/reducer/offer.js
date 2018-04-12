import { ActionTypes } from '../actions';

const initialStates = {
  offers: [],
  sectionOffers: [],
  isLoading: false,
  errorMessage: ''
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
  return sectionList;
};

export default (state = initialStates, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFER:
      return {
        ...state,
        offers: action.offers,
        sectionOffers: _processSectionList(action.offers),
        isLoading: false
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
