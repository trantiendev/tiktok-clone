import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { Video } from './../types';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
  secondaryVCard?: any;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
  secondaryVCard,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mutedVideo, setMutedVideo] = useState<any>();

  return (
    <div
      onMouseEnter={() => {
        videoRef?.current?.play();
        setMutedVideo(false);
      }}
      onMouseLeave={() => {
        videoRef?.current?.pause();
        setMutedVideo(true);
      }}
      className={`flex flex-col ${
        !secondaryVCard && 'pb-6 border-b border-gray-200'
      }`}
    >
      {secondaryVCard ? null : (
        <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${postedBy?._id}`}>
                <>
                  <Image
                    width={56}
                    height={56}
                    className=" rounded-full"
                    src={postedBy?.image}
                    alt="user-profile"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${postedBy?._id}`}>
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {postedBy.userName}{' '}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {postedBy.userName}
                  </p>
                </div>
              </Link>
              <Link href={`/detail/${_id}`}>
                <p className="mt-2 font-normal ">{caption}</p>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[604px]">
        <div
          className={`rounded-3xl relative ${
            secondaryVCard
              ? 'video-container-secondary'
              : 'video-container-primary'
          }`}
        >
          <Link href={`/detail/${_id}`}>
            <video
              muted={mutedVideo ?? true}
              loop
              autoPlay={false}
              controls={secondaryVCard ? false : true}
              ref={videoRef}
              src={video.asset.url}
              className="rounded-md cursor-pointer object-cover feed-video"
            ></video>
          </Link>
        </div>
        {secondaryVCard && (
          <>
            <p className="mt-2">{caption}</p>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className="flex mt-1 cursor-pointer">
                <div className="w-6 h-6">
                  <Image
                    width={20}
                    height={20}
                    className=" rounded-full"
                    src={postedBy?.image}
                    alt="user-profile"
                    layout="responsive"
                  />
                </div>
                <p className="flex gap-2 items-center md:text-md text-primary ml-1">
                  {postedBy.userName}{' '}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
