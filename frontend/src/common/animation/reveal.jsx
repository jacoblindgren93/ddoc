import { motion, useAnimate, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Reveal({ children, y }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();
    const style = {
        position: "relative",
        overflow: "hidden",
        width: "100%",
    };

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    return (
        <div ref={ref}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 45 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
