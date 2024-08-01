import { useAtom, useAtomValue } from "jotai";
import { PencilLine } from "lucide-react";
// import { Link } from "react-router-dom";

import { connectedAtom, globalFeeRateAtom, userInfoAtom } from "../store/user";

import { checkMetaletConnected, checkMetaletInstalled } from "../utils/wallet";
import BuzzFormWrap from "./BuzzFormWrap";
import CustomAvatar from "./CustomAvatar";
import MusicPlayer from './MusicPlayer';
import { IBtcConnector } from "@metaid/metaid";
import AboutModal from "./AboutModal";

type IProps = {
  onWalletConnectStart: () => Promise<void>;
  onLogout: () => void;
  btcConnector: IBtcConnector;
};

const Navbar = ({ onWalletConnectStart, onLogout, btcConnector }: IProps) => {
  const [globalFeeRate, setGlobalFeeRate] = useAtom(globalFeeRateAtom);

  const connected = useAtomValue(connectedAtom);
  const userInfo = useAtomValue(userInfoAtom);

  const onBuzzStart = async () => {
    await checkMetaletInstalled();
    await checkMetaletConnected(connected);

    const doc_modal = document.getElementById(
      "new_buzz_modal"
    ) as HTMLDialogElement;
    doc_modal.showModal();
  };

  const onEditProfileStart = async () => {
    const doc_modal = document.getElementById(
      "edit_metaid_modal"
    ) as HTMLDialogElement;
    doc_modal.showModal();
  };

  return (
    <>
      <AboutModal />

      <div className="z-10 navbar p-3 bg-main absolute top-0">
        <div className="container flex justify-between">
          <div className="flex items-center gap-2">
            {/* <Link to={'/'}>
              <img
                src='/logo_navbar.png'
                // width={100}
                // height={26}
                className='w-20 h-5 md:w-[100px] md:h-[26px]'
              />
            </Link> */}
            <div className="flex items-center">
              <img src="/banana_logo.png" width={50} height={70} />
              <span className="title-font">Banana3</span>
            </div>
              <div> 
              <MusicPlayer />
              </div>
            {/* <div className='dropdown dropdown-hover'>
              <div
                className='border btn-xs btn rounded-md text-main bg-[black] cursor-pointer hover:bg-[black]'
                tabIndex={0}
                role='button'
              >
                {network ?? 'testnet'}
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu px-4 py-4 gap-3 shadow bg-main rounded-box w-[120px] border border-[#131519] left-[-30px]'
                style={{
                  borderRadius: '12px',
                  boxShadow: '0px 4px 10px 0px rgba(169, 211, 18, 0.5)',
                }}
              >
                {networks.map((network, index) => {
                  return (
                    <div key={network}>
                      <li
                        className='hover:bg-[rgba(219, 243, 136, 0.5)] rounded-box relative'
                        key={network}
                        onClick={() =>
                          handleSwitchNetwork(
                            network.toLowerCase() as BtcNetwork
                          )
                        }
                      >
                        <a
                          className='text-[#1D2F2F] text-[14px]'
                          // style={{ textIndent: '2.2em' }}
                        >
                          {network}
                        </a>
                      </li>
                      {index !== 2 && (
                        <div className='border border-[#1D2F2F]/50 w-[80%] mx-auto'></div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div> */}
          </div>

          <div className="flex items-center gap-2">
            <div className="gap-4 hidden lg:flex">
              <a
                href="https://docs.metaid.io/"
                className="text-lime-900 font-bold hover:underline hover:text-lime-700"
                target="_blank"
              >
                Docs
              </a>
              <button
                className="text-lime-900 font-bold hover:underline hover:text-lime-700"
                onClick={() => {
                  const doc_modal = document.getElementById(
                    "about_modal"
                  ) as HTMLDialogElement;
                  doc_modal.showModal();
                }}
              >
                About
              </button>
              <div className="border-r border border-[#1D2F2F]/50 mr-2"></div>
            </div>

            <img
              src="/charging-pile.png"
              className="w-[30px] h-[35px] hidden md:block"
            />
            <input
              inputMode="numeric"
              type="number"
              min={0}
              max={"100000"}
              style={{
                appearance: "textfield",
              }}
              aria-hidden
              className="w-[65px] h-[32px] input input-xs  bg-[black]  shadow-inner !pr-0 border-none focus:border-main text-main focus:outline-none  hidden md:block"
              step={1}
              value={globalFeeRate}
              onChange={(e) => {
                const v = e.currentTarget.value;
                setGlobalFeeRate(v);
              }}
            />
            <div className="text-[#1D2F2F] hidden md:block">sat/vB</div>

            <PencilLine
              className="border rounded-full text-main bg-[black] p-2 cursor-pointer ml-2 w-9 h-9 md:w-12 md:h-12"
              // size={45}
              onClick={onBuzzStart}
            />

            {connected ? (
              <div className="dropdown dropdown-hover">
                {/* <div tabIndex={0} role="button" className="btn m-1">Hover</div> */}
                <div tabIndex={0} role="button" className="cursor-pointer ">
                  <CustomAvatar userInfo={userInfo!} borderRadius={'50%'}/>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu px-4 py-4 gap-3 shadow bg-main rounded-box w-[170px] border border-[#131519] left-[-86px]"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px 0px rgba(169, 211, 18, 0.5)",
                  }}
                >
                  <li
                    className="hover:bg-[rgba(219, 243, 136, 0.5)] rounded-box relative"
                    onClick={onEditProfileStart}
                  >
                    <img
                      src="/profile-icon.png"
                      width={55}
                      height={55}
                      className="absolute left-0 top-0"
                    />
                    <a
                      className="text-[#1D2F2F] text-[14px]"
                      style={{ textIndent: "2.2em" }}
                    >{`Edit Profile`}</a>
                  </li>
                  <div className="border border-[#1D2F2F]/50 w-[80%] mx-auto"></div>
                  <li
                    className="hover:bg-[rgba(219, 243, 136, 0.5)] rounded-box relative"
                    onClick={onLogout}
                  >
                    <img
                      src="/logout-icon.png"
                      width={55}
                      height={55}
                      className="absolute left-0 top-0"
                    />
                    <a
                      className="text-[#1D2F2F] text-[14px]"
                      style={{ textIndent: "2.5em" }}
                    >
                      Disconnect
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="btn-sm w-[120px] text-[12px] md:text-[14px] md:btn-md md:w-[180px] btn btn-outline hover:bg-[black] hover:text-main rounded-full font-medium"
                onClick={onWalletConnectStart}
              >
                Connect Wallet
              </div>
            )}
          </div>
        </div>
      </div>
      <dialog id="new_buzz_modal" className="modal  !z-20">
        <div className="modal-box bg-[#191C20] !z-20 py-5 w-[90%] lg:w-[50%]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="border border-white text-white btn btn-xs btn-circle absolute right-5 top-5.5">
              ✕
            </button>
          </form>
          <h3 className="font-medium text-white text-[16px] text-center">
            New Buzz
          </h3>
          <BuzzFormWrap btcConnector={btcConnector} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Navbar;
