import { useState } from 'react';
import axios from 'axios';

import { Video } from '../types';
import { BASE_URL } from '../utils';
import InfiniteListPosts from '../components/InfiniteListPosts';

interface IProps {
  feedPosts: Video[];
}

const Home = ({ feedPosts }: IProps) => {
  const [posts, setPosts] = useState<Video[]>(feedPosts);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      <InfiniteListPosts posts={posts} setPosts={setPosts} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data: feedPosts } = await axios.get(`${BASE_URL}/api/post/feedPosts`);

  return {
    props: {
      feedPosts,
    },
  };
};

export default Home;
