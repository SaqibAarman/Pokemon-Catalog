import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Pagination from "../../components/Pagination/Pagination";
import { useMemo, useState } from "react";

export default function Home({ pokemons }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const PAGE_SIZE = 20;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const pokemonsData = useMemo(() => {
    let pokemonData = pokemons;

    setTotalItem(pokemonData.length);

    return pokemonData.slice(
      (currentPage - 1) * PAGE_SIZE,
      (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
    );
  }, [pokemons, currentPage]);

  return (
    <>
      <h1 className={styles.heading}>Pokemon Catalogs</h1>
      <div className={styles.grid}>
        {pokemonsData.map((pokemon) => (
          <Link
            href={`/${pokemon.id}`}
            className={styles.card}
            key={pokemon.id}
          >
            <div className={styles.cardThumb}>
              <Image
                src={pokemon.image}
                alt="Pokemon-Image"
                width={200}
                height={150}
              />
            </div>
            <div className={styles.details}>
              <span> # {pokemon.number}</span>
              <h2 className={styles.name}>{pokemon.name}</h2>
              <div className={styles.bottomDetails}>
                <div className={styles.types}>
                  {pokemon.types.map((type) => (
                    <span key={type}>{type}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.paginate}>
        <Pagination
          items={totalItem} // 100
          currentPage={currentPage} // 1
          pageSize={PAGE_SIZE} // 20
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query pokemons($first: Int = 100) {
        pokemons(first: $first) {
          id
          number
          name
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          attacks {
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
      pokemons: data.pokemons,
    }, // will be passed to the page component as props
  };
}
