import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Custom404: NextPage = () => {
  const { push } = useRouter();
  // React.useEffect(() => {
  //   push('/');
  // }, []);
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <Link id="zeddi" href="/">
        <a href="#zeddi" className="absolute top-0 lef-0">
          <Image
            width={230}
            height={100}
            src="/images/zaddi/logo_primary.svg"
          />
        </a>
      </Link>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-primary">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, You have no access to this page.
          </p>
          <p className="mt-4 mb-8 text-primary">
            But dont worry, you can contact us for help.
          </p>
          <Link href="/">
            <a
              rel="noopener noreferrer"
              href="#zeddi"
              className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
            >
              Go to Home
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
