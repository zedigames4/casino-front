import Image from 'next/image';
import React from 'react';

const RoundedBtn = ({
  url,
  title,
  value,
}: {
  url: string;
  title: string;
  value: number;
}) => {
  return (
    <div className="flex gap-5 items-center">
      <div className="rounded-full bg-[#6E4DF2] p-2">
        <Image
          src={url || '/images/icons8_coins_48px.png'}
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="font-sans text-white/50">{title}</h4>
        <p className="font-sans text-3xl">{value}</p>
      </div>
    </div>
  );
};

export default RoundedBtn;
