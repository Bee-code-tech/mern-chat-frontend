import { Col, Row, message } from "antd";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { FaRegPlayCircle } from "react-icons/fa";

const Gallery = () => {
  const { authUser } = useAuthContext();
  const [file, setFile] = useState();
  const [descriptions, setDescriptions] = useState("");
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      setDescriptions("");
      setFile(null);
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };
  const handleTextArea = (e) => {
    setDescriptions(e.target.value);
  };
  const upload = async () => {
    if (!file) {
      message.error("No file selected for upload.");
      return;
    }

    const maxFileSize = 10 * 1024 * 1024;
    if (file.type.startsWith("video/") && file.size > maxFileSize) {
      message.error("Video file size exceeds the 10MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("description", descriptions);

    let uploadUrl = "";
    let successMessage = "";

    if (file.type.startsWith("image/")) {
      formData.append("file", file); // for image
      uploadUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/community/gallery/image/upload/${authUser?._id}`;
      successMessage = "Image Uploaded Successfully!";
    } else if (file.type.startsWith("video/")) {
      formData.append("video", file); // for video
      uploadUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/community/gallery/video/upload/${authUser?._id}`;
      successMessage = "Video Uploaded Successfully!";
    } else {
      message.error("Unsupported file type.");
      return;
    }

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      console.log("🚀 ~ upload ~ data:", data);

      if (data.success) {
        message.success(successMessage);
        setDescriptions("");
        setFile(null);
        fetchGalleryData();
        document.getElementById("my_modal_5").close();
      } else {
        message.error(data.message || "Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Failed to upload file");
    }
  };
  return (
    <>
      <div className="mx-10 mb-10 flex justify-between items-center mt-28">
        <button
          className="btn bg-[#18BB0C] text-white"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <span className="flex items-center">
            <span>Add Pic</span>
            <IoMdAdd color="white" size="1.2em" />
          </span>
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-5 text-center">
              Uplaod Image or Video!
            </h3>
            <div className="flex flex-col gap-5">
              <input
                type="file"
                className="file-input file-input-primary "
                onChange={(e) => setFile(e.target.files[0])}
                placeholder="Upload Image or Video(Max:10MB)"
              />
              <label className="form-control">
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Description"
                  onChange={handleTextArea}
                ></textarea>
              </label>
              <button
                type="button"
                className="btn btn-primary btn-outline font-bold"
                onClick={upload}
              >
                Upload
              </button>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-error text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <button className="btn bg-transparent">
          <IoInformationCircleOutline color="#18BB0C" size="2em" />
        </button>
      </div>
      <div className="border-2 border-[#18BB0C] rounded-xl p-3 mx-5">
        <div className="border-2 rounded-lg px-8 py-9 bg-white">
          <Row gutter={[24, 16]}>
            {galleryData?.map((item, index) => {
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
                  {item?.image && (
                    <Link to={`/galleryDetails/${item?._id}`}>
                      <div className="card card-compact  w-full  shadow-xl max-w-64 ">
                        <figure>
                          <img
                            src={item?.image}
                            className="rounded-xl object-cover"
                          />
                        </figure>
                      </div>
                    </Link>
                  )}
                  {item?.video && (
                    <Link to={`/galleryDetails/${item?._id}`}>
                      <div className="card card-compact bg-base-content shadow-xl image-full bg-none max-w-64 max-h-36">
                        <figure>
                          <img
                            src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
                            className="rounded-lg w-full object-cover"
                          />
                        </figure>
                        <div className="card-body items-center justify-center">
                          <FaRegPlayCircle
                            size="2.5em"
                            className="text-white hover:text-green-500"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </Link>
                  )}
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Gallery;
