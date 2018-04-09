const LAYOUT_1 = [
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{}]
  },
  {
    direction: 'column',
    width: '50%',
    height: 600,
    items: [{ height: 250 }, { height: 170 }, { height: 180 }]
  },
  {
    direction: 'column',
    width: '50%',
    height: 600,
    items: [{ height: 300 }, { height: 300 }]
  },
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{}]
  }
];

const LAYOUT_2 = [
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{}]
  },
  {
    direction: 'row',
    width: '100%',
    height: 300,
    items: [{ width: '50%' }, { width: '50%' }]
  },
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{}]
  },
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{ width: '50%' }, { width: '50%' }]
  },
  {
    direction: 'row',
    width: '100%',
    height: 100,
    items: [{}]
  }
];

export default { LAYOUT_1, LAYOUT_2 };
