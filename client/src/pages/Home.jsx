import { Link, Image } from "@nextui-org/react";
import NavBar from "../components/NavBar";
import HeroImage from "../assets/home-pattern.png";
import NFTImage from "../assets/nft.png";
import VastingImage from "../assets/vasting.png";
import ContractImage from "../assets/contract.png";
import BadgeImage from "../assets/badge.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <NavBar />
      <main className="px-4 sm:px-16 md:px-28">
        <section className="flex flex-col sm:flex-row justify-center items-center gap-y-10 sm:gap-x-20 mt-10 sm:mt-20">
          <div className="text-center sm:text-left">
            <Link
              href="#"
              className="bg-customPrimary py-2 px-8 rounded-full text-black"
            >
              TRY NOW
            </Link>
            <p className="text-xl sm:text-2xl font-bold mt-4">
              BUILD SECURE SMART CONTRACT
            </p>
            <p className="text-xl sm:text-2xl font-bold">
              IN CARDANO BLOCKCHAIN
            </p>
          </div>
          <div className="mt-6 sm:mt-0">
            <Image
              src={HeroImage}
              width={300}
              sm:width={400}
              alt="NextUI hero Image"
            />
          </div>
        </section>

        <section className="mt-16 sm:mt-32 p-4 sm:p-8 bg-customPrimaryGray border border-solid border-2">
          <p className="text-center text-xl sm:text-2xl">
            Forg<b>eS</b>mith
          </p>
          <p className="mt-2 sm:mt-4 text-center text-sm sm:text-base">
            ForgeSmith Contract helps you minimize risk by using tested
            libraries of smart contracts for the Cardano blockchain. It includes
            the most used implementations of Cardano standards.
          </p>
        </section>

        <section className="mt-16 sm:mt-32 flex flex-col sm:flex-row justify-center items-center gap-y-10 sm:gap-x-20">
          <div>
            <Image
              src={NFTImage}
              width={150}
              sm:width={200}
              alt="NextUI hero Image"
            />
          </div>

          <div className="w-full sm:w-6/12">
            <div>
              <p className="text-center text-lg sm:text-xl font-bold">
                MintNFT
              </p>
              <p className="text-center text-sm sm:text-base mt-2">
                validating information, creating a new block, and recording that
                information into the blockchain
              </p>
            </div>

            <div className="mt-6 sm:mt-4">
              <p className="text-center text-lg sm:text-xl font-bold">Burn</p>
              <p className="text-center text-sm sm:text-base mt-2">
                the act of sending a token to an inaccessible address
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 sm:mt-32 flex flex-col sm:flex-row justify-center items-center gap-y-10 sm:gap-x-20">
          <div className="w-full sm:w-6/12">
            <div>
              <p className="text-center text-lg sm:text-xl font-bold">
                Vesting
              </p>
              <p className="text-center text-sm sm:text-base mt-2">
                Gradually releasing tokens to investors, team members, or other
                stakeholders over a predetermined schedule
              </p>
            </div>

            <div className="mt-6 sm:mt-4">
              <p className="text-center text-lg sm:text-xl font-bold">Gift</p>
              <p className="text-center text-sm sm:text-base mt-2">
                Gift can function as speculative investments or simply as an
                equivalent to cash to buy things online
              </p>
            </div>
          </div>

          <div>
            <Image
              src={VastingImage}
              width={150}
              sm:width={200}
              alt="NextUI hero Image"
            />
          </div>
        </section>

        <section className="mt-16 sm:mt-32 flex flex-col sm:flex-row justify-center items-center gap-y-10 sm:gap-x-20">
          <div className="bg-customPrimary h-36 flex flex-row gap-x-4 sm:gap-x-6 justify-center items-center px-8 sm:px-16 border border-black shadow-black shadow-sm">
            <div>
              <Image
                src={ContractImage}
                width={40}
                sm:width={50}
                alt="NextUI hero Image"
              />
            </div>

            <div>
              <p className="text-lg sm:text-xl font-bold">2,345</p>
              <p className="text-sm sm:text-base">Contracts</p>
            </div>
          </div>

          <div className="bg-customPrimary h-36 flex flex-row gap-x-4 sm:gap-x-6 justify-center items-center px-8 sm:px-16 border border-black shadow-black shadow-sm">
            <div>
              <Image src={BadgeImage} width={40} sm:width={50} alt="Badge" />
            </div>

            <div>
              <p className="text-lg sm:text-xl font-bold">1</p>
              <p className="text-sm sm:text-base">Award</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
