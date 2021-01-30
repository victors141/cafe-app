import React from "react";
import Form from "./Form";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

export const CREATE_DISH = gql`
  mutation CreateDish($name: String!, $photo: String!, $price: Int!, $type: String!) {
    insert_dishes(objects: { name: $name, photo: $photo, price: $price, type: $type }) {
      affected_rows
    }
  }
`;

function Create() {
  const history = useHistory();
  const [createDish, { loading, error }] = useMutation(CREATE_DISH, {
    onCompleted: () => history.push("/"),
  });

  function onSave({ type, name, price, photo }) {
    createDish({ variables: { type, name, price:parseInt(price,10), photo } });
  }

  return (
    <div className="border rounded-lg py-5 px-8 md:py-10 md:px-16">
      <Form onSave={onSave} loading={loading} error={error} formTitle="Add Menu Item" />
    </div>
  );
}

export default Create;
