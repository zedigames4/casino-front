import Image from 'next/image';
import Link from 'next/link';

const JoinOthers = () => {
  return (
    <div className="justify-between rounded-3xl bg-[#36008E] mx-4 md:mr-12 md:ml-12 flex mt-16 py-3 flex-col md:flex-row">
      <div className="self-center justify-center items-center flex flex-col ml-10 md:ml-40">
        <h2 className="font-bold text-3xl">Join others get big win</h2>
        <Link href="/login?sign_up=true">
          <button
            type="button"
            className="mt-8 rounded-3xl px-12 py-2 bg-[#7400D3] hover:bg-[#7400D3]/70"
          >
            Register
          </button>
        </Link>
      </div>

      <Image
        src="/images/girl_using_computer.svg"
        className="rounded-2xl"
        width="830px"
        height="660px"
        layout="intrinsic"
        objectFit="cover"
      />
    </div>
  );
};

export default JoinOthers;
