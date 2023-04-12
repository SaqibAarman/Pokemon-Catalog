import React from "react";
import styles from "./Modal.module.css";
import Image from "next/image";

const Modal = ({ open, onClose, evolution }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.modalRight}>
          <p className={styles.closeBtn} onClick={onClose}>
            X
          </p>
          <div className={styles.content}>
            {evolution !== null ? (
              evolution?.map((item) => (
                <div className={styles.cardData} key={item.id}>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    className={styles.image}
                  />
                  <h2>
                    {item.name} # {item.number}
                  </h2>
                  {item.types.map((type) => (
                    <span className={styles.types} key={type}>
                      {type}
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <>
                <span className={styles.notFound}>No Evolutions Found!</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
