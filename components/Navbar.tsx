import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import Logo from '../utils/tiktok-logo.png';
import { IUser } from '../types';
import SearchForm from './SearchForm';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="border-b-2 border-gray-200 bg-white py-2 px-4 fixed top-0 left-0 right-0  z-10">
      <div className="xl:w-[1200px] m-auto flex justify-between items-center ">
        <Link href="/">
          <div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px] relative">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>

        <SearchForm />

        <div>
          {user ? (
            <div className="flex gap-5 md:gap-10 items-center align-center">
              <Link href="/upload">
                <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" />{' '}
                  <span className="hidden md:block">Upload </span>
                </button>
              </Link>
              {user.image && (
                <Link href={`/profile/${user._id}`}>
                  <div>
                    <Image
                      className="rounded-full cursor-pointer"
                      src={user.image}
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </div>
                </Link>
              )}
              <button
                type="button"
                className="p-2 rounded-full cursor-pointer outline-none"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('error')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
