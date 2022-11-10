import React, { useMemo } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Video } from '../types';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { fetchNextDetailPosts } from '../utils/queries';

interface IProps {
  postId: string;
}

const NextPrevButtons = ({ postId }: IProps) => {
  const { listFeedPosts, fetchFeedPosts } = useAuthStore();
  const {
    posts,
    lastId,
    lastPublishedAt,
  }: {
    posts: Video[];
    firstId: string;
    lastId: string;
    lastPublishedAt: string;
  } = listFeedPosts;

  const router = useRouter();

  let findIndexPost = useMemo(
    () => posts.findIndex(({ _id }) => _id === postId),
    [postId]
  );

  const handleNextPost = async () => {
    if (lastId === null && postId === posts[posts.length - 1]._id) {
      alert('No More Post To Show');
      return;
    }

    if (postId === posts[posts.length - 1]._id) {
      const result = await client.fetch(
        fetchNextDetailPosts(lastPublishedAt, lastId)
      );

      if (result?.length > 0) {
        fetchFeedPosts({
          ...listFeedPosts,
          posts: [...posts, ...result],
          lastId: result[result.length - 1]._id,
          lastPublishedAt: result[result.length - 1]._createdAt,
        });

        router.push(`/detail/${result[0]._id}`);
      } else {
        fetchFeedPosts({
          ...listFeedPosts,
          lastId: null,
        });
      }
    } else {
      router.push(`/detail/${posts[findIndexPost + 1]._id}`);
    }
  };

  const handlePrevPost = () => {
    if (findIndexPost === 0) {
      alert('Post Dau Tien Ma?');
      return;
    }

    router.push(`/detail/${posts[findIndexPost - 1]._id}`);
  };

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col z-10">
      <button
        onClick={handlePrevPost}
        className="p-2 rounded-full bg-white bg-opacity-30"
        disabled={findIndexPost === 0}
      >
        <IoIosArrowUp className="text-white text-[30px]" />
      </button>

      <button
        onClick={handleNextPost}
        className="p-2 rounded-full bg-white bg-opacity-30 mt-3"
      >
        <IoIosArrowDown className="text-white text-[30px]" />
      </button>
    </div>
  );
};

export default NextPrevButtons;
