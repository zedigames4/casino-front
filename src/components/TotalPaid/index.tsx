import Image from 'next/image';
import React from 'react';

const TotalPaid = () => {
  return (
    <div className="px-4 md:px-8 mx-auto w-full max-w-4xl md:grid grid-cols-3 gap-5 mt-12">
      <div className="flex flex-col items-center">
        <Image
          src="/images/paid.png"
          alt=""
          width={95}
          height={80}
          layout="fixed"
        />
        <p className="font-bold uppercase">rwf 1,000,000</p>
        <p className="mt-1 text uppercase text-[#01FEDF]">TOTAL PAID</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          src="/images/secure.png"
          alt=""
          width={95}
          height={80}
          layout="fixed"
        />
        <p className="font-bold uppercase">100%</p>
        <p className="mt-1 text uppercase text-[#01FEDF]">Secure</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          src="/images/support.png"
          alt=""
          width={95}
          height={80}
          layout="fixed"
        />
        <p className="font-bold uppercase">24/7</p>
        <p className="mt-1 text uppercase text-[#01FEDF]">Support</p>
      </div>
    </div>
  );
};

export default TotalPaid;
