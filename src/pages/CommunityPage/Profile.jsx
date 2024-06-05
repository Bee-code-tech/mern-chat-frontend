import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";
import { useAuthContext } from "../../context/AuthContext";
import { LiaEdit } from "react-icons/lia";

const Profile = () => {
  const { setAuthUser } = useAuthContext();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersData, setUsersData] = useState({})

  const cloudName = "di36rc30e";
  const uploadPreset = "mrh3qf9";

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
        { withCredentials: true }
      );
      const userData = user.data.data;
    setUsersData(userData)


      setValue("fullName", userData.fullName);
      setValue("username", userData.username);
      setValue("gender", userData.gender);
      setValue("designation", userData.designation);
      setValue(
        "DateOfBirth",
        userData.DateOfBirth ? userData.DateOfBirth.slice(0, 10) : ""
      );
      setValue("phoneNumber", userData.phoneNumber);
      setValue("contactAddress", userData.contactAddress);
    };
    getUser();
  }, [refetch, setValue]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log("🚀 ~ handleChange ~ file:", file);
    setSelectedImage(file);
  };

  const handleFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
  
      const imageRes = response.data.secure_url;
  
  
       await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {profilePic : imageRes},
        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );

      
  
      
    } catch (error) {
      console.error("Error updating image:", error);
    }
  }
  

  const onSubmit = async (data) => {
    if (selectedImage) {
      try {
        const imgBBUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_BB_API_KEY
        }`;
        const formData = new FormData();
        formData.append("image", selectedImage);

        axios
          .post(imgBBUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Image uploaded successfully:", response.data.data);
            setImageUrl(response.data.data.display_url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
          });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return; // Handle error (optional: display error message to user)
      }
    }

    // Send data to backend with imageUrl (if available)
    const backendData = { ...data, profilePic: imageUrl }; // Create data object with imageUrl

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        backendData,
        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );

      if (!response.data.success) {
        console.error(response.data.data.msg); // Handle errors from the server
        return toast.error(response.data.data.msg);
      }
      toast.success(response.data.msg);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.msg);
    }
  };

  const handlePasswordChange = async (payload) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/changePass`,
        payload,
        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );
      console.log("🚀 ~ handlePasswordChange ~ response:", response);

      // if (!response.data.success) {
      //   console.error(response.data.data.msg); // Handle errors from the server
      //   return toast.error(response.data.data.msg);
      // }
      if (response.data.success) {
        toast.success(response.data.msg);
        reset();
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.msg);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/deleteAccount`,

        {
          withCredentials: true, // Include credentials for authenticated requests
        }
      );
      console.log("🚀 ~ handleDeleteAccount ~ response:", response);

      // if (!response.data.success) {
      //   console.error(response.data.data.msg); // Handle errors from the server
      //   return toast.error(response.data.data.msg);
      // }
      if (response.data.success) {
        toast.success(response.data.msg);
        localStorage.removeItem("chat-user");
        setAuthUser(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <section className="space-y-5">
      <div className="border border-[#18BB0C] max-w-3xl  rounded-lg py-5 mx-auto shadow-md">
        <h3 className="my-2 flex items-center justify-center text-xl font-bold">
          Update Basic Info
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90%] md:max-w-xl mx-auto"
        >
            {/* profile picture  */}
          <div className="w-[200px] h-[200px] mb-8 flex mx-auto mt-10 rounded-full  relative">
            <div className="overflow-hidden rounded-full w-full  hover:scale-110 transition ease-in-out duration-300  h-full">
              <img
                src={usersData?.profilePic}
                alt={`Profile image of ${usersData?.fullName}`}
                className="block rounded-full  w-full h-full object-cover object-center"
              />
              <input 
                type="file" 
                accept='image/jpg, image/jpeg, image/png'
                onChange={handleFile}
                className="absolute  inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
            </div>
            {/* <div className="bg-white absolute bottom-2 right-3 shadow-xl p-3 z-10 rounded-full">

        </div> */}
            <label htmlFor="file"> 
            <LiaEdit className="text-black absolute cursor-pointer bottom-2 right-2 bg-white shadow-lg p-3 z-10 rounded-full" size="54px"/>
            </label>
          </div>
     
          <div className="my-5">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium "
            >
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("fullName")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium "
            >
              Email
            </label>
            <input
              name="username"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("username")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium "
            >
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("phoneNumber")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="designation"
              className="block mb-2 text-sm font-medium "
            >
              Designation
            </label>
            <input
              name="designation"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("designation")}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="gender" className="block mb-2 text-sm font-medium ">
              Gender
            </label>
            <select
              name="gender"
              type="text"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 text-sm font-medium "
            >
              Date of Birth
            </label>
            <input
              name="DateOfBirth"
              // value={user.DateOfBirth}
              type="date"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("DateOfBirth")}
            />
          </div>

          
          <div className="mb-5">
            <label
              htmlFor="contactAddress"
              className="block mb-2 text-sm font-medium "
            >
              Contact Address
            </label>
            <textarea
              name="contactAddress"
              rows={3}
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("contactAddress")}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="border border-[#18BB0C] max-w-3xl mx-auto rounded-lg p-5  shadow-md">
        <h3 className="my-2 flex items-center justify-center text-xl font-bold">
          Change Password
        </h3>
        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className="max-w-sm md:max-w-xl mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium "
            >
              Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("oldPassword")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium "
            >
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
              {...register("newPassword")}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-[#18BB0C] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center my-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 px-5 py-2 rounded-lg text-white"
        >
          Delete Account
        </button>
        <DeleteAccountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteAccount}
        />
      </div>
    </section>
  );
};

export default Profile;
