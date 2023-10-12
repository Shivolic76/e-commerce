"use client";
import { fetchProductDetail, updateProduct } from "@/redux/slices/productSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const route = useRouter();

  const singleProduct = useSelector(
    (state: any) => state?.products?.singleProduct
  );
  const isLoading = useSelector((state: any) => state.products.isLoading);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: singleProduct?.title,
    category: singleProduct?.category,
    description: singleProduct?.description,
    price: singleProduct?.price,
  });

  const [updateStatus, setUpdateStatus] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductDetail(params.id));
    };
    fetchData();
  }, [dispatch, params.id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    setUpdateStatus({ isLoading: true, isSuccess: false, isError: false });
    try {
      await dispatch(
        updateProduct({ id: params.id, updatedProductData: editedProduct })
      );
      setUpdateStatus({ isLoading: false, isSuccess: true, isError: false });
      setIsEditing(false);
    } catch (error) {
      setUpdateStatus({ isLoading: false, isSuccess: false, isError: true });
    }
  };

  if (isLoading || !singleProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 border-opacity-60"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={singleProduct.image}
          alt={singleProduct.title}
          className="w-full h-80 object-cover object-center rounded-t-lg"
        />
        <div className="px-6 py-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, title: e.target.value })
                }
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              />
            ) : (
              singleProduct.title
            )}
          </h1>
          <p className="text-gray-700 text-xl mb-4">
            Category:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              />
            ) : (
              singleProduct.category
            )}
          </p>
          <p className="text-gray-700 text-xl mb-4">
            Description:{" "}
            {isEditing ? (
              <textarea
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
                className="border rounded-md py-2 px-3 w-full h-32 focus:outline-none focus:border-blue-500 resize-y"
              />
            ) : (
              singleProduct.description
            )}
          </p>
          <p className="text-2xl text-indigo-600 mb-4">
            Price:{" "}
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  })
                }
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              />
            ) : (
              `$${singleProduct.price}`
            )}
          </p>
          {isEditing ? (
            <>
              {" "}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveClick}
              >
                {updateStatus.isLoading
                  ? "Updating..."
                  : updateStatus.isSuccess
                  ? "Updated"
                  : updateStatus.isError
                  ? "Error"
                  : "Update"} 
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => route.back()}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => route.push("/")}
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
