import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const DELETE_DISH = gql`
  mutation DeleteDish($id: Int!) {
    delete_dishes(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
function Dish({ dish, refetch }) {
  const [deleteDish] = useMutation(DELETE_DISH, {
    onCompleted: () => refetch(),
  });

  function handleDeleteDish(id) {
    if (window.confirm("Are you sure you want to delete this item")) {
      deleteDish({ variables: { id } });
    }
  }

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg relative">
      <div className="absolute z-10 right-2 top-2 flex ">
        <button>
          <Link
            to={`/edit/${dish.id}`}
            className="text-xs bg-blue-600 text-white hover:bg-blue-700 rounded px-2 py-1  "
          >
            Edit
          </Link>
        </button>
        <button
          onClick={() => handleDeleteDish(dish.id)}
          className="ml-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded px-2 py-1  "
        >
          Delete
        </button>
      </div>

      <div className="relative  h-48">
        <div className="bg-gradient-to-r from-gray-500 via-gray-100 to-gray-500 h-full w-full "></div>
        <img className="h-full absolute inset-0 m-auto" src={dish.photo} alt="Mountain" />
      </div>

      <div className="px-6 py-4 bg-white flex items-center justify-between">
        <div>
          <div className="text-gray-700 font-medium uppercase text-sm mb-1">{dish.type}</div>
          <p className="font-bold  text-base">{dish.name} </p>
        </div>
        <span className="text-gray-500 text-md">${dish.price} </span>
      </div>
    </div>
  );
}

export default Dish;
