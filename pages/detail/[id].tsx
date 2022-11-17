import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';

import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';
import NextPrevButtons from '../../components/NextPrevButtons';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const router = useRouter();
  const [post, setPost] = useState(postDetails);
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState<string>('');
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = async (like: boolean) => {
    if (!userProfile) return;

    const { data } = await axios.put(`${BASE_URL}/api/like`, {
      like,
      userId: userProfile._id,
      postId: post._id,
    });

    setPost({ ...post, likes: data.likes });
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userProfile && !comment) return;

    setIsPostingComment(true);

    const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
      userId: userProfile._id,
      comment,
    });

    setPost({ ...post, comments: data.comments });
    setComment('');
    setIsPostingComment(false);
  };

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap z-10">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.push('/')}>
            <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
          </p>
        </div>

        <NextPrevButtons postId={post._id} />

        <div className="lg:h-[100vh] h-[60vh]">
          <video
            controls
            ref={videoRef}
            autoPlay
            loop
            src={post?.video?.asset.url}
            className=" h-full cursor-pointer"
          ></video>
        </div>
      </div>

      <div className="relative w-full lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
              <Image
                width={60}
                height={60}
                alt="user-profile"
                className="rounded-full"
                src={post.postedBy.image}
              />
              <div>
                <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                  {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className="text-blue-400 text-xl" />
                </div>
                <p className="text-md"> {post.postedBy.userName}</p>
              </div>
            </div>
          </Link>
          <div className="px-10">
            <p className=" text-md text-gray-600">{post.caption}</p>
          </div>
          <div className="mt-4 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                flex="flex"
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
