import {useAppDispatch, useAppSelector} from "../../hooks.tsx";
import {setAllPosts} from "../../features/postsSlice.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {Post} from "../../interfaces.tsx";

const SortingPosts = () => {

        const allPosts = useAppSelector(state => state.posts.posts)
        const dispatch = useAppDispatch()
        const [sortCriteria, setSortCriteria] = useState<string | undefined>()
        const [commentsSortingOrder, setCommentsSortingOrder] = useState<string>('descending')
        const [dateSortingOrder, setDateSortingOrder] = useState<string>('descending')
        const [likesSortingOrder, setLikesSortingOrder] = useState<string>('descending')


        const toggleSortingOrder = (orderGetter: string, orderSetter: Dispatch<SetStateAction<string>>) => {
            orderSetter(orderGetter === 'ascending' ? 'descending' : 'ascending')
        }
        const sortPostsByCriteria = (criteria: string, order: string, posts: Post[] | undefined) => {
            if (posts) {
                switch (criteria) {
                    case 'date':
                        return sortByDate(posts, order);
                    case 'comments':
                        return sortByComments(posts, order);
                    case 'likes':
                        return sortByLikes(posts, order);
                }
            }

        }
        const sortByDate = (posts: Post[], order: string) => {

            setSortCriteria('date')
            toggleSortingOrder(dateSortingOrder, setDateSortingOrder)

            const sortedPosts = [...posts].sort((objA, objB) => {
                if (order === 'ascending') {
                    return new Date(objA.createdAt).getTime() - new Date(objB.createdAt).getTime();
                } else {
                    return new Date(objB.createdAt).getTime() - new Date(objA.createdAt).getTime();
                }
            })
            dispatch(setAllPosts(sortedPosts))
            console.log('sortedPosts', sortedPosts)
        }


        const sortByComments = (posts: Post[], order: string) => {

            setSortCriteria('comments')
            toggleSortingOrder(commentsSortingOrder, setCommentsSortingOrder)

            const sortedPosts = [...posts].sort((objA, objB) => {
                if (order === 'ascending') {
                    return objA.comments.length - objB.comments.length
                } else {
                    return objB.comments.length - objA.comments.length
                }
            })
            dispatch(setAllPosts(sortedPosts))
            console.log('sortedPosts', sortedPosts)
        }


        const sortByLikes = (posts: Post[], order: string) => {

            setSortCriteria('likes')
            toggleSortingOrder(likesSortingOrder, setLikesSortingOrder)

            const sortedPosts = [...posts].sort((objA, objB) => {
                if (order === 'ascending') {
                    return objA.likes.length - objB.likes.length
                } else {
                    return objB.likes.length - objA.likes.length
                }
            })
            dispatch(setAllPosts(sortedPosts))
            console.log('sortedPosts', sortedPosts)
        }


        return (
            <div className="flex gap-4 w-full justify-end rounded p-2 text-sm">

                <div className="p-1 text-slate-400 mr-4">
                    sort by:
                </div>

                <div
                    onClick={() => sortPostsByCriteria('comments', commentsSortingOrder, allPosts)}
                    className={`flex gap-2 cursor-pointer hover:bg-slate-200 rounded p-1 ${sortCriteria === 'comments' ? 'bg-slate-200' : 'bg-slate:100'} ${sortCriteria === 'comments' ? 'text-black' : 'text-slate-400'}`}>
                    <div>
                        comments
                    </div>
                    <div className="flex flex-col items-center justify-center w-4">
                        {
                            sortCriteria === 'comments' && commentsSortingOrder === 'ascending' &&
                            <i className="fas fa-sort-up"></i>
                        }
                        {
                            sortCriteria === 'comments' && commentsSortingOrder === 'descending' &&
                            <i className="fas fa-sort-down"></i>
                        }
                    </div>
                </div>


                <div
                    onClick={() => sortPostsByCriteria('likes', likesSortingOrder, allPosts)}
                    className={`flex gap-2 cursor-pointer hover:bg-slate-200 rounded p-1 ${sortCriteria === 'likes' ? 'bg-slate-200' : 'bg-slate:100'} ${sortCriteria === 'likes' ? 'text-black' : 'text-slate-400'}`}>
                    <div>
                        likes
                    </div>
                    <div className="flex flex-col items-center justify-center w-4">
                        {
                            sortCriteria === 'likes' && likesSortingOrder === 'ascending' &&
                            <i className="fas fa-sort-up"></i>
                        }
                        {
                            sortCriteria === 'likes' && likesSortingOrder === 'descending' &&
                            <i className="fas fa-sort-down"></i>
                        }
                    </div>
                </div>


                <div
                    onClick={() => sortPostsByCriteria('date', dateSortingOrder, allPosts)}
                    className={`flex gap-2 cursor-pointer hover:bg-slate-200 rounded p-1 ${sortCriteria === 'date' ? 'bg-slate-200' : 'bg-slate:100'} ${sortCriteria === 'date' ? 'text-black' : 'text-slate-400'}`}>
                    <div>
                        date
                    </div>
                    <div className="flex flex-col items-center justify-center w-4">
                        {
                            sortCriteria === 'date' && dateSortingOrder === 'ascending' &&
                            <i className="fas fa-sort-up"></i>
                        }
                        {
                            sortCriteria === 'date' && dateSortingOrder === 'descending' &&
                            <i className="fas fa-sort-down"></i>
                        }
                    </div>
                </div>

            </div>
        );
    }
;

export default SortingPosts;
