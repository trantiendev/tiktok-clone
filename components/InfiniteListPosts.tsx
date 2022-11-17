import { Dispatch, useEffect, useState, SetStateAction, memo } from 'react';
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
}

const InfiniteListPosts = ({ posts }: IProps) => {
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const { fetchFeedPosts, listFeedPosts } = useAuthStore();
  const { posts: feedPosts, firstId, lastId, lastPublishedAt } = listFeedPosts;

  useEffect(() => {
    if (posts[0]?._id !== firstId) {
      fetchFeedPosts({
        posts,
        firstId: posts[0]?._id,
        lastId: posts[posts.length - 1]?._id,
        lastPublishedAt: posts[posts.length - 1]?._createdAt,
      });
    }
  }, [posts]);

  useEffect(() => {
    (lastId === null) ? setHasMorePosts(false) : setHasMorePosts(true);
  }, [lastId])

  const handleLoadMore = async () => {
    if (lastId === null) return [];

    const result = await client.fetch(
      fetchNextFeedPosts(lastPublishedAt, lastId)
    );

    if (result?.length > 0) {
      fetchFeedPosts({
        ...listFeedPosts,
        posts: [...feedPosts, ...result],
        lastId: result[result.length - 1]._id,
        lastPublishedAt: result[result.length - 1]._createdAt,
      });
    } else {
      fetchFeedPosts({
        ...listFeedPosts,
        lastId: null,
      });

      setHasMorePosts(false);
    }
  };

  if (!feedPosts?.length) return <NoResults text={`No Videos`} />;

  return (
    <InfiniteScroll
      dataLength={feedPosts.length}
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
      {feedPosts.map((post: Video) => (
        <VideoCard post={post} isShowingOnHome key={post._id} />
      ))}
    </InfiniteScroll>
  );
};

export default memo(InfiniteListPosts);
