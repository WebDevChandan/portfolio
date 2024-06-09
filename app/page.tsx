import { PrismaClient } from '@prisma/client';
import { Effects, HomeText, MyImage } from './components';
import './styles/home.scss';

const prisma = new PrismaClient();

interface HomeDataType {
  image: string,
  role: string[],
}

const fetchHomeDetails = async (): Promise<HomeDataType | null> => {
  try {
    const homeData = await prisma.home.findFirst({
      select: {
        image: true,
        role: true,
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
              <HomeText role={homeData?.role} />

              <div className="home-img">
                <MyImage src={homeData?.image} />
              </div>
            </>
          )}

        </div>
      </div>

    </section>
  )
}
