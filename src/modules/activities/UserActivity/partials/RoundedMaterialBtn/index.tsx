import React from 'react';

const RoundedMaterialBtn = ({
  iconName,
  title,
  value,
}: {
  iconName: string;
  title: string;
  value: number;
}) => {
  return (
    <div className="flex gap-5 items-center">
      <div className="rounded-full text-5xl bg-[#6E4DF2] py-2 px-3.5 material-icons">
        {iconName}
      </div>
      <div className="flex flex-col">
        <h4 className="font-sans text-white/50">{title}</h4>
        <p className="font-sans text-3xl">{value}</p>
      </div>
    </div>
  );
};

export default RoundedMaterialBtn;
