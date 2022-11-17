import { useState } from 'react';
import axios from 'axios';

import { Video } from '../types';
import { BASE_URL } from '../utils';
import InfiniteListPosts from '../components/InfiniteListPosts';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  const [posts] = useState<Video[]>(videos);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      <InfiniteListPosts posts={posts} />
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post/feedPosts`);

  topic && (response = await axios.get(`${BASE_URL}/api/discover/${topic}`));

  return {
    props: {
      videos: response.data ,
    },
  };
};

export default Home;
