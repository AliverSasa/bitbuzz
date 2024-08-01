import { ArrowBigUpDash } from 'lucide-react';
import BuzzList from '../components/BuzzList';

// import RecommendUsers from "../components/RecommendUsers";
type Iprops = {
  onScrollToTop: () => void;
};

// raw

const Home = ({ onScrollToTop }: Iprops) => {
  return (
    <>
      <main className='relative'>
        {/* <RecommendUsers /> */}

        <BuzzList />
      </main>
      <ArrowBigUpDash
        className='fixed top-0 right-2 lg:right-4 w-8 h-8 cursor-pointer hover:text-main'
        onClick={onScrollToTop}
      />
    </>
  );

  // return (
  //   <main className='h-full place-content-center overflow-hidden'>
  //     <img
  //       src='/orbuzz_home_img.png'
  //       width={650}
  //       height={600}
  //       alt='Picture of the home'
  //       className='absolute top-[10rem]'
  //     />
  //     <div className='flex flex-col items-center mt-[12rem]'>
  //       <div className="text-main font-['impact'] text-[120px]">BIT DID</div>
  //       <div className='text-[white]'>Claim your DID on bitcoin</div>
  //       <div
  //         className='btn btn-primary rounded-full mt-[8rem] text-[20px] font-medium	w-[220px]'
  //         onClick={onWalletConnectStart}
  //       >
  //         Connect Wallet
  //       </div>
  //     </div>
  //   </main>
  // );
};

export default Home;
