import { motion, useAnimate, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function RevealWithBox({ children, width = "fit-content" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [isInView]);

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                width: width,
                overflow: "hidden",
            }}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                style={{
                    width: "110%",
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    backgroundColor: "#b55a36",
                    zIndex: 20,
                }}
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%" },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}
            />
        </div>
    );
}
