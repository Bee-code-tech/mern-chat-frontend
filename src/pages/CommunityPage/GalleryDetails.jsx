import { Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft, FaUpload } from "react-icons/fa6";
import { useEffect, useState } from "react";
import picfallback from '../../assets/upload.png'
import { useAuthContext } from "../../context/AuthContext";

const GalleryDetails = () => {
  const { id } = useParams();
  const [gallerySingleData, setGallerySingleData] = useState();
  const [galleryData, setGalleryData] = useState([]);
  const { authUser } = useAuthContext();

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
      const images = data.filter(image => image.image)
      setGalleryData(images);
      console.log('gallery data', data);
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
  console.log('data', gallerySingleData);

  return (
    <div className="px-3">
      <div className="container mx-auto mt-28 mb-10 flex justify-between items-center">
        <Link to="/">
          <button className="btn bg-[#18BB0C] text-white">
            <span className="flex items-center">
              <FaAngleLeft color="white" size="1.2em" />
              <span>Back</span>
            </span>
          </button>
        </Link>

      </div>

      <div className="border border-[#18BB0C] rounded-xl p-2 container mx-auto">
        <div className="border border-gray-300 p-5 rounded-xl">
          {!gallerySingleData?.image && !gallerySingleData?.video ? (
            <>
              <div className="flex justify-center flex-col w-full items-center h-[500px]">
                    <div className="rounded-lg p-8  border border-slate-300 ">
          <h1 className="text-xl  font-bold">No Pictures Found</h1>
          </div>
                    </div>
            </>
          ) : (
            < div className="flex flex-col">
              <div className="order-1 md:order-2 lg:order-2 mt-10 mb-4">
                {gallerySingleData?.image && (
                  <div>
                    <img
                      src={gallerySingleData?.image}
                      className="w-full rounded-2xl"
                    />
                  </div>
                )}
               
              </div>

              {gallerySingleData?.description && (
                <div className="order-2  md:order-3 lg:order-3 border rounded-lg px-8 py-9 bg-white my-5">
                  {gallerySingleData?.description}
                </div>
              )}

              <div className="order-3 md:order-1 lg:order-1 flex flex-col lg:flex-row border rounded-lg px-8 py-9 bg-white">
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
                        <Link to={`/galleryDetails/pics/${item?._id}`}>
                          <div className="card card-compact rounded w-full shadow-xl">
                            <figure className="w-full h-full">
                              {item?.image ? (
                                <img src={item?.image} className="rounded-lg w-full h-full object-cover  aspect-[1.45]" />
                              ) : (
                               null
                              )}
                            </figure>
                          </div>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </ div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetails;
