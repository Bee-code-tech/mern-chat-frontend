import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const NewTopic = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const {authUser} = useAuthContext()
  const navigate = useNavigate();

  const onSubmit = (data) => postTopic({ ...data, body: content });
  const postTopic = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics`,
      {
        method: "POST",
        credentials: "include",
        headers: { 
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }
    reset();
    setContent("");
    toast.success(data.msg);
    navigate("/community/topics");
  };

  useEffect(() => {
    const getTopicCategory = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/category`,
        {
          method: "GET",
          Authorization: `Bearer ${authUser.token}`,
          credentials: "include", 
        }
      );

      const data = await res.json();
      console.log("🚀 ~ getTopicCategory ~ data:", data);
      if (!data.success) {
        return toast.error(data.msg);
      }
      setCategories(data.data);
    };
    getTopicCategory();
  }, []);
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm md:max-w-xl mx-auto"
      >
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium ">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            {...register("title")}
          />
        </div>
        <div className="mb-5 ">
          <label htmlFor="category" className="block mb-2 text-sm font-medium ">
            Category
          </label>
          <div className="flex items-center gap-3">
            <select
              name="category"
              className="bg-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              {...register("category")}
            >
              <option>Select a Category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <a
              href="/community/topics/category/new"
              target="_blank"
              className="border cursor-pointer p-2 rounded-md border-[#18BB0C]  text-[#18BB0C] hover:bg-[#18BB0C] hover:text-white text-xl"
            >
              +
            </a>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="body" className="block mb-2 text-sm font-medium ">
            Body
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default NewTopic;
