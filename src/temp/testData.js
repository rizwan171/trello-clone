const cards1 = [
  {
    id: 'card-1',
    content: 'Test Content 1'
  },
  {
    id: 'card-2',
    content: 'Test Content 2 which is slightly longer in length than the first card'
  }
]

const cards2 = [
  {
    id: 'card-3',
    content: 'Test Content 1'
  },
  {
    id: 'card-4',
    content: 'Test Content 2 which is slightly longer in length than the first card'
  }
]

const cards3 = [
  {
    id: 'card-5',
    content: 'Test Content 1'
  },
  {
    id: 'card-6',
    content: 'Test Content 2 which is slightly longer in length than the first card'
  }
]

const testData = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Todo',
      cards: cards1,
    },
    'list-2': {
      id: 'list-2',
      title: 'In progress',
      cards: cards2,
    },
    'list-3': {
      id: 'list-3',
      title: 'Done',
      cards: cards3,
    }
  },
  listIds: [
    'list-1',
    'list-2',
    'list-3',
  ]
}

export default testData;