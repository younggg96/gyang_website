import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./index.scss";
import classNames from "classnames";

/**
 * 
 * @param {boolean} isOpen check modal open or not
 * @param {toggleOpen} set modal open status
 *  const [isOpen, toggleOpen] = useCycle(false, true);
 *  <button onClick={() => toggleOpen()}>click</button>
    <GyModal isOpen={isOpen} toggleOpen={toggleOpen}>
      aaa
    </GyModal>
 * @returns 
 */

const GyModal = ({ children, isOpen, toggleOpen, modalClass, ...props }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="gy-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={classNames(["modal", modalClass])}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            {children}
          </motion.div>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GyModal;
