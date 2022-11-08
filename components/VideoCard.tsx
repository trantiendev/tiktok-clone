import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { Video } from './../types';

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
  profile?: any;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
  profile,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      onMouseEnter={() => videoRef?.current?.play()}
      onMouseLeave={() => videoRef?.current?.pause()}
      className={`flex flex-col ${!profile && 'pb-6 border-b border-gray-200'}`}
    >
      {profile ? null : (
        <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${postedBy?._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
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
            profile ? 'video-container-secondary' : 'video-container-primary'
          }`}
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              controls={profile ? false : true}
              ref={videoRef}
              src={video.asset.url}
              className="rounded-md cursor-pointer object-cover feed-video"
            ></video>
          </Link>
        </div>
        {profile && <p className="mt-2">{caption}</p>}
      </div>
    </div>
  );
};

export default VideoCard;
