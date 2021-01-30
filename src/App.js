import React from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Menu from "./components/Menu";

const classes = {
  newPost: "bg-green-500 text-white rounded px-4 text-xs py-2 uppercase font-semibold tracking-wide",
  link: "text-blue-500 underline hover:text-blue-700",
};

function EmptyData() {
  return (
    <div className="text-center">
      {"No data. "}
      <Link to="/create" className={classes.link}>
        Create a new menu item?
      </Link>
    </div>
  );
}

const GET_MENU = gql`
  query GetMenu {
    dishes(order_by: { createdAt: desc }) {
      id
      name
      photo
      price
      type
    }
  }
`;

function App() {
  const { loading, data, refetch } = useQuery(GET_MENU, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="py-10 px-16">
      {data.dishes.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <div className="flex items-center  mb-8 justify-between">
            <h2 className="text-gray-600 font-medium text-lg">Menu</h2>
            <Link to="/create" className="bg-blue-500 text-white rounded px-4 text-xs py-2 font-semibold tracking-wide">
              Add menu item
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.dishes.map((dish) => (
              <Menu key={dish.id} dish={dish} refetch={refetch} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
