
const POSTS = [
    {id: 1, name: 'a', role: '1'},
    {id: 2, name: 'b', role: '2'},
    {id: 3, name: 'c', role: '3'},
    {id: 4, name: 'd', role: '4'},
    {id: 5, name: 'e', role: '5'},
    {id: 6, name: 'f', role: '6'},
    {id: 7, name: 'g', role: '7'},
    {id: 8, name: 'h', role: '8'},
    {id: 9, name: 'i', role: '9'},
] as const;

const PAGE_SIZE = 3;

export const fetchPosts = (page: number) => {
    const startIndex = (page-1) * PAGE_SIZE;
    const hasNextPage = startIndex+PAGE_SIZE >= POSTS.length-1 ? false : true;
    const items = POSTS.slice(startIndex, startIndex+PAGE_SIZE);
    return {items, hasNextPage};
};