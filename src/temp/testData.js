const cards = [
  {
    id: 'card-1',
    content: 'Test Content 1'
  },
  {
    id: 'card-2',
    content: 'Test Content 2 which is slightly longer in length than the first card'
  }
]

const testData = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Todo',
      cards: cards,
    },
    'list-2': {
      id: 'list-2',
      title: 'In progress',
      cards: cards,
    }
  },
  listIds: [
    'list-1',
    'list-2',
  ]
}

export default testData;