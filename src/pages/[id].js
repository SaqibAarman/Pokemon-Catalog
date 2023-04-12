import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Modal from "../../components/Modal/Modal";

export const getServerSideProps = async ({ params }) => {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
    query pokemon($id: String = "${params.id}"){
        pokemon(id: $id){
          id
          number
          name
          weight{
            minimum
            maximum
          }
          height{
            minimum
            maximum
          }
          classification
          types
          resistant
          attacks{
            fast {
              name
              type
              damage
            }
            special {
              name
              type
              damage
            }
          }
          weaknesses
          fleeRate
          maxCP
          evolutions {
            id
            name
            number
            types
            image
          }
          evolutionRequirements {
            amount
            name
          }
          maxHP
          image
        }
      }
    `,
  });

  return {
    props: {
      pokemon: data.pokemon,
    },
  };
};

const Pokemon = ({ pokemon }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {pokemon.name} {"   "} # {pokemon.number}
      </h2>
      <div className={styles.left}>
        <div className={styles.image}>
          <Image
            src={pokemon.image}
            alt="Pokemon-Image"
            width={500}
            height={400}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.detail}>
          <p>
            Height
            <div className={styles.data}>
              <span> Max :- {pokemon.height.maximum}</span>
              <span> Min :- {pokemon.height.minimum}</span>
            </div>
          </p>
          <p>
            Weight
            <div className={styles.data}>
              <span> Max :- {pokemon.weight.maximum}</span>
              <span> Min :- {pokemon.weight.minimum}</span>
            </div>
          </p>
          <p>
            Classification
            <div className={styles.data}>
              <span>{pokemon.classification}</span>
            </div>
          </p>
        </div>

        <div className={styles.otherDetail}>
          <div className={styles.data}>
            Type
            {pokemon.types.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>

          <div className={styles.data}>
            Weaknesses
            {pokemon.weaknesses.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>

          <div className={styles.data}>
            Resistant
            {pokemon.resistant.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </div>
      </div>

      <button className={styles.btn} onClick={() => setOpenModal(!openModal)}>
        Evolutions
      </button>

      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(!openModal)}
          evolution={pokemon.evolutions}
        />
      )}
    </div>
  );
};

export default Pokemon;
