import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import FacebookIcon from '../_icons/facebookIcon';
import LinkedinIcon from '../_icons/linkedinIcon';
import TwitterIcon from '../_icons/twitterIcon';

const Footer = () => {
  const router = useRouter();
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };
  return (
    <div className="bg-[#22096F] py-12 px-4 md:px-8 text-white flex flex-col">
      <div className="flex flex-wrap gap-4 md:gap-x-12 w-full pb-3 border-b border-white ">
        <span className="relative h-9 min-w-36 rounded-xl self-stretch sm:hidden lg:block">
          <Image layout="fill" src="/images/zaddi/logo.svg" />
        </span>
        <div className="flex flex-wrap gap-3 md:space-x-8 items-center ml-auto">
          <Link href="/">
            <p
              className={` cursor-pointer font-bold uppercase py-3 ${
                router.pathname === '/' ? 'text-[#01FEDF]' : ''
              }`}
            >
              Home
            </p>
          </Link>
          <button
            type="button"
            onClick={() => scrollTo('#games_available')}
            className=" cursor-pointer font-bold uppercase py-3"
          >
            Games
          </button>
          <Link href="#pages">
            <p className="cursor-pointer font-bold uppercase py-3 ">Pages</p>
          </Link>

          <div className="ml-12 flex items-center space-x-3">
            <a
              href="http://www.facebook.com/zeddi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="http://www.twitter.com/zeddi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </a>
            <a
              href="http://www.instagram.com/zeddi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-3 px-4">
        &copy; {new Date().getFullYear()} Zeddi. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
