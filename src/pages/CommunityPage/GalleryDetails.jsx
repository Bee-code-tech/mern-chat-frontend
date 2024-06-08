import { Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import picfallback from '../../assets/upload.png'
import { useAuthContext } from "../../context/AuthContext";

const GalleryDetails = () => {
  const { id } = useParams();
  const [gallerySingleData, setGallerySingleData] = useState();
  const [galleryData, setGalleryData] = useState([]);
  const {authUser} = useAuthContext()

  useEffect(() => {
    fetchGalleryData();
    fetchGallerySingleData();
  }, [id]);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      const data = await res.json();
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  const fetchGallerySingleData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      const data = await res.json();
      setGallerySingleData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-28 mb-10 flex justify-start items-center">
        <Link to="/">
          <button className="btn bg-[#18BB0C] text-white">
            <span className="flex items-center">
              <FaAngleLeft color="white" size="1.2em" />
              <span>Back</span>
            </span>
          </button>
        </Link>
      </div>

      <div className="border-2 border-[#18BB0C] rounded-xl p-5 container mx-auto">
        <div className="border-2 border-gray-300 p-5 rounded-xl">
        {
         !gallerySingleData?.image  ?  (
            <>
               <div className="flex justify-center flex-col w-full  items-center">
                <div className="h-[430px] w-full flex justify-center items-center">
                <img src={picfallback} alt="" className="h-[100%]" />
                

                </div>
                <h1 className="text-xl font-bold">No Gallery Found</h1>
              </div>
            </>
          
         ) : (
          <>
          <div className="border-2 rounded-lg px-8 py-9 bg-white">
            <Row gutter={[24, 16]}>
              {galleryData.slice(0, 4)?.map((item, index) => {
                const key = `col-${index}`;
                return (
                  <Col
                    key={key}
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 6 }}
                    xl={{ span: 6 }}
                  >
                    <Link to={`/galleryDetails/${item?._id}`}>
                      <div className="card card-compact rounded w-full  shadow-xl">
                        <figure>
                          <img src={item?.image} className="rounded-lg" />
                        </figure>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
          {gallerySingleData?.image && (
            <div className="mt-10 mb-4">
              <div className="">
                <img
                  src={gallerySingleData?.image}
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          )}
          {gallerySingleData?.video && (
            <div className="mt-10 mb-4">
              <video controls src={gallerySingleData?.video} className="w-full aspect-video rounded-2xl shadow-2xl" />
            </div>
          )}
           {
            gallerySingleData?.image && gallerySingleData?.video  && (
                <div className="border-2 rounded-lg px-8 py-9 bg-white">
                 {gallerySingleData?.description}
                 </div>
             )
           }
          </>
         )
       }
        </div>
      </div>
    </>
  );
};

export default GalleryDetails;
