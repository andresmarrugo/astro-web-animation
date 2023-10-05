import React, { useRef, useLayoutEffect } from 'react'
import { gsap, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'

type Props = {
    children: React.ReactNode
}

const Sceene = (props: Props) => {
    const rootRef = useRef(null)
    const boxRef = useRef(null)
    const boxRef2 = useRef(null)
    const boxRef3 = useRef(null)
    const nameRef = useRef(null)
    const titleRef = useRef(null)


    if (typeof window !== "undefined") {
        useLayoutEffect(() => {
            const ctx = gsap.context(() => {
                gsap.registerPlugin(ScrollTrigger)
                let sn: any
                let st: any

                if (nameRef.current) {
                    sn = new SplitType(nameRef.current, {
                        types: "chars",
                    })
                }
                if (titleRef.current) {
                    st = new SplitType(titleRef.current, {
                        types: "chars"
                    })
                }

                gsap.set(sn.chars, {
                    opacity: 0,
                    y: "-=100"
                })
                gsap.set(st.chars, {
                    opacity: 0,
                    y: "+=300",
                })

                gsap.timeline().to(sn.chars, {
                    y: "+=100",
                    opacity: 1,
                    stagger: {
                        amount: 1,
                        from: "random",
                        ease: "Power4.inOut",
                    },
                    ease: 'bounce',
                })
                    .to(st.chars, {
                        delay: 0.2,
                        opacity: 1,
                        stagger: {
                            amount: 1,
                            from: "random",
                            ease: "Power4.inOut",
                        },
                        ease: "bounce",
                        y: "-=300"
                    })

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: "top top",
                        end: "+=1000",
                        scrub: true,
                        pin: true
                    }
                })
                    .to(boxRef.current, {
                        y: "-100vh",
                        scale: 2,
                        opacity: 0,
                        autoAlpha: 0,
                        ease: "bounce"
                    })
                    .to(boxRef2.current, { left: "-100vw", opacity: 0, rotate: -90 })
                    .to(boxRef3.current, { right: "-100vw", opacity: 0, rotate: 180 })

            }, rootRef)
            return () => {
                ctx.revert()
            };
        }, [])
    }

    return (
        <div ref={rootRef} className='bg-black h-screen w-full overflow-hidden flex flex-wrap'  >
            <section ref={boxRef} className='absolute z-[999] w-full'>
                {props.children}
            </section>
            <section ref={boxRef} className='absolute flex flex-col items-center justify-center select-none top-0 h-full w-full bg-black overflow-hidden z-[100]'>
                <h1 ref={nameRef} className="font-bold text-5xl sm:text-9xl">Andrés Marrugo</h1>
                <h2 ref={titleRef} className="text-xl sm:text-4xl">Frontend Developer</h2>
            </section>
            <section ref={boxRef2} className='absolute top-0 h-full w-full bg-blue-300 overflow-hidden z-[10]'>
                <img
                    src="https://picsum.photos/800/500?random=1"
                    alt="random img 1"
                    className="w-screen h-screen object-cover"
                />
            </section>
            <section ref={boxRef3} className='absolute top-0 h-full w-full bg-red-300 overflow-hidden z-[5]'>
                <img
                    src="https://picsum.photos/800/500?random=2"
                    alt="random img 1"
                    className="w-screen h-screen object-cover"
                />
            </section>
            <section className='absolute top-0 h-full w-full bg-purple-300 overflow-hidden z-0'>
                <img
                    src="https://picsum.photos/800/500?random=3"
                    alt="random img 1"
                    className="w-screen h-screen object-cover"
                />
            </section>
        </div>
    )
}

export default Sceene