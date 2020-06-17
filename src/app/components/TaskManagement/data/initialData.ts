export const initialBoardData = {
    items: [
        {
            id: 'item-1',
            content: 'Content of item 1.',
            title: 'Title1',
        },
        {
            id: 'item-2',
            content: 'Content of item 2.',
            title: 'Title2',
        },
        {
            id: 'item-3',
            content: 'Content of item 3.',
            title: 'Title3',
        },
        {
            id: 'item-4',
            content: 'Content of item 4.',
            title: 'Title4',
        },
       {
            id: 'item-5',
            content: 'Content of item 5.',
            title: 'title5',
        },
        {
            id: 'item-6',
            content: 'Content of item 6.',
            title: 'title6',
        },
        {
            id: 'item-7',
            content: 'Content of item 7.',
            title: 'titley8',
        },
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Column 1',
            itemsIds: [
                'item-1',
                'item-2',
                'item-3',
                'item-4',
                'item-5',
                'item-6',
                'item-7',
            ],
        },
        'column-2': {
            id: 'column-2',
            title: 'Column 2',
            itemsIds: [] as string[],
        },
        'column-3': {
            id: 'column-3',
            title: 'Column 3',
            itemsIds: [] as string[],
        },
    },
    columnsOrder: ['column-1', 'column-2', 'column-3'],
};
