import { Dispatch, useEffect, useState, SetStateAction } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';

import { client } from '../utils/client';
import { fetchNextFeedPosts } from '../utils/queries';
import { Video } from '../types';
import useAuthStore from '../store/authStore';

interface IProps {
  posts: Video[];
  setPosts: Dispatch<SetStateAction<Video[]>>;
}

const InfiniteListPosts = ({ posts, setPosts }: IProps) => {
  const [lastPublishedAt, setLastPublishedAt] = useState<string>('');
  const [lastId, setLastId] = useState<string | null>('');
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const { fetchFeedPosts, listFeedPosts } = useAuthStore();

  useEffect(() => {
    setLastPublishedAt(() => posts[posts.length - 1]?._createdAt);
    setLastId(() => posts[posts.length - 1]?._id);

    // fetchFeedPosts({
    //   posts,
    //   lastId: posts[posts.length - 1]?._id,
    //   lastPublishedAt: posts[posts.length - 1]?._createdAt,
    // });

    if (!posts?.length) setHasMorePosts((hasMorePosts) => !hasMorePosts);
  }, [posts]);

  const handleLoadMore = async () => {
    if (lastId === null) return [];

    const result = await client.fetch(
      fetchNextFeedPosts(lastPublishedAt, lastId)
    );

    if (result?.length > 0) {
      setLastPublishedAt(result[result.length - 1]._createdAt);
      setLastId(result[result.length - 1]._id);
      setPosts((posts: Video[]) => [...posts, ...result]);

      // fetchFeedPosts({
      //   posts: [...posts, ...result],
      //   lastId: result[result.length - 1]._id,
      //   lastPublishedAt: result[result.length - 1]._createdAt,
      // });
    } else {
      // fetchFeedPosts({
      //   ...listFeedPosts,
      //   lastId: null,
      // });
      setLastId(null);
      setHasMorePosts((hasMorePosts) => !hasMorePosts);
    }
    // console.log('handleLoadMore')
  };
  // console.log('listFeedPosts', listFeedPosts)

  if (!posts?.length) return <NoResults text={`No Videos`} />;

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={handleLoadMore}
      hasMore={hasMorePosts}
      loader={
        <div className="flex justify-center">
          <Image
            src="/ico_loading.gif"
            alt="loading icon"
            width="50px"
            height="50px"
          />
        </div>
      }
      endMessage={
        <div className="flex flex-col items-center py-6">
          <h4 className="text-center">Nothing More To Show</h4>
          <Image
            src="/ico_end.gif"
            alt="no more posts icon"
            width="150px"
            height="150px"
            layout="fixed"
          />
        </div>
      }
    >
      {posts?.map((post: Video) => (
        <VideoCard post={post} isShowingOnHome key={post._id} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteListPosts;
