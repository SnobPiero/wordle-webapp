import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import { AiOutlineInfo, AiOutlineCheck, AiOutlineWarning, AiOutlineAlert, AiOutlineQuestion } from "react-icons/ai";

import Button from "@/components/ui/Button";

import { useOnClickOutside } from "@/utils/event";

const Modal = forwardRef(
  (
    {
      type = "alert",
      level = null,
      title = null,
      text = null,
      callback = null,
      btnText = null,
      showButtons = true,
      size = null, // large
      children = null,
    },
    ref,
  ) => {
    const refOut = useRef();

    useOnClickOutside(refOut, () => (type === "alert" || showButtons === false) && setOpen(false));

    const [open, setOpen] = useState(false);

    const [processingCallback, setProcessingCallback] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open() {
          setOpen(true);
        },
      }),
      [],
    );

    return (
      <ModalLayer>
        {open && (
          <>
            <div className="modal-back"></div>
            <div className={`modal-container ${type} ${level ? level : ""} ${size ? size : ""}`} ref={refOut}>
              <div className="data">
                {level !== null && (
                  <div className="circle">
                    {type === "alert" && level === "info" && <AiOutlineInfo className="icon" />}
                    {type === "alert" && level === "success" && <AiOutlineCheck className="icon" />}
                    {type === "alert" && level === "warn" && <AiOutlineWarning className="icon" />}
                    {type === "alert" && level === "danger" && <AiOutlineAlert className="icon" />}
                    {type === "confirm" && <AiOutlineQuestion className="icon" />}
                  </div>
                )}

                <div className="message">
                  {title && <div className="title">{title}</div>}
                  {text && <div className="text">{text}</div>}
                  {children}
                </div>
              </div>
              {showButtons && (
                <div className="buttons">
                  {type === "alert" && (
                    <>
                      <Button
                        level={level}
                        loading={processingCallback}
                        onClick={async () => {
                          setProcessingCallback(true);
                          callback && (await callback());
                          setOpen(false);
                          setProcessingCallback(false);
                        }}
                      >
                        {btnText || "Ok"}
                      </Button>
                    </>
                  )}
                  {type === "confirm" && (
                    <>
                      <Button
                        level="secondary"
                        disabled={processingCallback}
                        onClick={() => {
                          !processingCallback && setOpen(false);
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        level={level}
                        loading={processingCallback}
                        onClick={async () => {
                          setProcessingCallback(true);
                          callback && (await callback());
                          setOpen(false);
                          setProcessingCallback(false);
                        }}
                      >
                        {btnText || "Confrim"}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </ModalLayer>
    );
  },
);

Modal.displayName = "Modal";

Modal.propTypes = {
  type: PropTypes.string,
  level: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  callback: PropTypes.func,
  btnText: PropTypes.string,
  showButtons: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const ModalLayer = ({ children }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#modal");
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, ref.current) : null;
};

ModalLayer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

export default Modal;
