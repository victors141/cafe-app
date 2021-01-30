import React from "react";
import Form from "./Form";
import { useHistory, useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_DISH = gql`
  query GetDish($id: Int!) {
    dishes_by_pk(id: $id) {
      name
      photo
      price
      type
      id
    }
  }
`;

const UPDATE_DISH = gql`
  mutation UpdateDish($id: Int!, $name: String!, $photo: String!, $price: Int!, $type: String!) {
    update_dishes(where: { id: { _eq: $id } }, _set: { type: $type, price: $price, photo: $photo, name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

function Edit() {
  const history = useHistory();
  const { id } = useParams();
  const { loading, data } = useQuery(GET_DISH, { variables: { id } });
  const [updateDish, { loading: loading2, error }] = useMutation(UPDATE_DISH, {
    onCompleted: () => history.push("/"),
  });

  if (loading) {
    return <div>loading...</div>;
  }

  function onSave({ type, name, price, photo }) {
    updateDish({ variables: { id, type, name, price, photo } });
  }

  return (
    <div className="border rounded-lg py-5 px-8 md:py-10 md:px-16">
      <Form dish={data.dishes_by_pk} onSave={onSave} loading={loading2} error={error} formTitle="Edit Menu Item" />
    </div>
  );
}

export default Edit;
