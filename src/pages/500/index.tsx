import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Custom500: NextPage = () => {
  return (
    <div className="flex h-[calc(100vh)] p-5 w-full bg-white">
      <Link id="zeddi" href="/">
        <a href="#zeddi" className="absolute top-0 lef-0">
          <Image
            width={230}
            height={100}
            src="/images/zaddi/logo_primary.svg"
          />
        </a>
      </Link>
      <div className="text-center mx-auto">
        <div className="inline-flex rounded-full p-4">
          <div className="rounded-full p-4">
            <Image src="/images/500.svg" height={500} width={600} />
          </div>
        </div>
        <p className="text-slate-600 lg:text-lg">
          Oops something went wrong. Try to refresh this page or <br /> feel
          free to contact us if the problem presists.
        </p>
      </div>
    </div>
  );
};

export default Custom500;
