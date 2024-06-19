import prisma from '@/utils/prisma';
import { Effects, HomeText, MyImage } from './components';
import './styles/home.scss';

interface HomeDataType {
  myImages: string[],
  roles: string[],
}

const fetchHomeDetails = async (): Promise<HomeDataType | null> => {
  try {
    const homeData = await prisma.personalInfo.findFirst({
      select: {
        myImages: true,
        roles: true,
      }
    });

    return homeData;

  } catch (error) {
    throw new Error(`Error Fetching Home Details: ${error}`);
  }

}

export default async function Home() {
  const homeData = await fetchHomeDetails();

  return (
    <section className="home-section section" id="home">
      <Effects />

      <div className="container">
        <div className="row full-screen align-items-center">

          {homeData && (
            <>
              <HomeText role={homeData?.roles} />

              <div className="home-img">
                <MyImage src={homeData?.myImages[0]} />
              </div>
            </>
          )}

        </div>
      </div>

    </section>
  )
}
