import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const horizontalRef = useRef(null);

    useEffect(() => {
        const horizontalSection = horizontalRef.current;

        if (horizontalSection) {
            gsap.to(horizontalSection, {
                x: () => -1 * (horizontalSection.scrollWidth - window.innerWidth),
                scrollTrigger: {
                    trigger: horizontalSection,
                    start: "center center",
                    end: "+=2000px",
                    pin: "#horizontal-scroll",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        }
    }, []);

    return (
        <div>
            {/* Intro Section */}
            <section className="flex justify-center items-center h-screen bg-purple-700 text-cream">
                <h1 className="text-4xl font-bold">Horizontal Scrolling Cards with GSAP</h1>
            </section>

            {/* Horizontal Scroll Section */}
            <section id="horizontal-scroll" className="py-[200px]">
                <div className="overflow-hidden h-[525px]">
                    <div ref={horizontalRef} className="flex h-full">
                        {[1, 2, 3, 4, 5, 6].map((card) => (
                            <div
                                key={card}
                                className={`flex-shrink-0 flex px-[5px] ${card === 1 ? "pl-[15px]" : card === 6 ? "pr-[45px]" : ""
                                    }`}
                            >
                                <div className="flex items-stretch w-[540px] p-[50px_40px] bg-purple-700 rounded-[38px] text-cream">
                                    <h2 className="text-2xl font-bold">Card {card}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HorizontalScroll;
