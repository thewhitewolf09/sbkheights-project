import FadeIn from "@/components/animation/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";

export default function OurTeamPage() {
  return (
    <>
      <section className="py-32 px-12 md:px-24 grid md:grid-cols-2 gap-20 items-center border-b border-outline-variant/30">
        <FadeIn direction="right">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
            LEADERSHIP <br />
            <span className="text-secondary">EXCELLENCE</span>
          </h2>
          <p className="text-lg text-on-surface-variant font-light leading-relaxed mb-8 max-w-xl">
            Our leadership team comprises visionaries who have redefined the
            skyline for over three decades. At SBK Heights, we don't just build
            structures; we curate lifestyles characterized by architectural
            integrity and unparalleled luxury.
          </p>
          <div className="grid grid-cols-2 gap-12 border-t border-outline-variant/30 pt-12">
            <div>
              <span className="block text-3xl font-bold text-primary mb-2">
                30+
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Years of Heritage
              </span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-primary mb-2">
                150+
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Global Awards
              </span>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="left" className="relative h-[600px] bg-surface-container">
          <img
            alt="Executive meeting"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            data-alt="Close up of a professional executive in a sharp navy suit looking through architectural blueprints in a sunlit modern boardroom"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlu2XGNCTP9Kt7HGC4p_f4b9E_bV7YSdZYFQ1g7tO7SumuAlJS6WD9TT9pw1eDAt5mXJfQoDhAo2jumDRuUdJ3_HCALvHmY4uJCGUj45weGLrAMoQht3-Lij62xP0b9c3Yh2feJEPovGoF8S7csVyG3Md_A_3d_sjgQSVunSEVQO6YEqxrjzS_PANEDe7300sjK5T27V3HDRvY1J_AkSolCf7Pqp2rXMCCfC4mK8DcJtsD8GNNA5h3XxDj11X40O_FuV2afco1SlU"
          />
          <div className="absolute -bottom-8 -left-8 bg-secondary p-12 hidden lg:block shadow-2xl">
            <p className="text-white font-serif text-2xl leading-tight">
              "Integrity is the foundation of every height we reach."
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="py-32 px-12 md:px-24">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-secondary uppercase tracking-[0.2em] text-xs mb-4 block">
              The Visionaries
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              MEET THE TEAM
            </h2>
          </div>
          <div className="flex gap-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant self-center">
              Filter by Expertise
            </span>
            <div className="w-12 h-[1px] bg-outline-variant self-center"></div>
          </div>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <StaggerItem className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-surface-container">
              <img
                alt="Managing Director"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Professional portrait of a male executive with graying hair in a charcoal suit standing against a textured dark wall"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9CcZV_lMjr_r1orYDqetCTtk64zZKSxHDLm-jxGZezSzH-JaiJebrdQWTHwbXlM3_TJCgm5v7EJXRidldJVeHNSswkuiK0UNbHSrvX2lVtTbJVY49wXdEIQtdhXIvE73N3LjpTyZZmg3CbHkG_6VYCc1AITrs2UmDXmLuQDI06fozYOD4nleFSaNP9u0bAWSKpv2au-BiuhLz06atyc8813sU6_ow-kHzhbpt6AWnJ6P47xeLVJZMq6JyhFMbBsrN8Dp2bCDyi7E"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span className="font-label text-secondary uppercase tracking-[0.1em] text-xs mb-2 block">
              Founding Partner
            </span>
            <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
              ALEXANDER S. VANCE
            </h3>
            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-6">
              With an eye for sustainable verticality, Alexander has pioneered
              the integration of smart-glass technology in luxury residential
              developments across the globe.
            </p>
            <div className="flex gap-4">
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="group pt-12 md:pt-0">
            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-surface-container">
              <img
                alt="Chief Architect"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Professional portrait of a female executive in a white structured blazer with a confident expression in a bright architectural setting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_RgOrZxzqaB-eepSu2ywJ_vtmn-3ue5sYJ2VVvHYp7G-pF2mt2Mj0tOUIcpQDHSmwKiMXyHx2mTLgohcIcydHSaEnbAOSBiYvCQzXU0x7riFbPXxH5-uQmFIVh8tI8NWm7dYMVzO3tdFa7KUPGxjLoOZcLn15L5VhMDKdJKIL4adW9hzus80TvK5nhKKOFz_zJCHuMRnUBbt0U0djIWgNCugjhN8GZNX4IoeHzFLMLfo40uWIDPnPM9iNpdgdwt6mk_A1wcEOL8"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span className="font-label text-secondary uppercase tracking-[0.1em] text-xs mb-2 block">
              Chief Architect
            </span>
            <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
              ELENA KOURIKOVA
            </h3>
            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-6">
              Elena's designs are defined by their rhythmic asymmetry and
              connection to light. She believes architecture should be felt as
              much as it is seen.
            </p>
            <div className="flex gap-4">
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-surface-container">
              <img
                alt="Head of Construction"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Professional portrait of a male professional in a modern navy polo shirt leaning against a concrete column with soft natural light"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh9UU0HZim0nlJSU9tapI-FBjGVd6itd8rx7MJyDn2BjrbT0Ts7nyfFz109w3XOzuSbR0-4HT0XcHjKmdeWN1MYvF0mzx-MQv2smYsds2tWIJLd1arUgx8KX5I1nYOImk_KLqpxWB_EBalvbPIVfq-Ia0eMMbpU6t8aoGnTwqxutvT0F4s4A8fHXibgwNjB7EitV66J-VaWBrTu9QwESNLUvk00VwAVUhOk6p-0y9zwtmB6mYk6UJdbHPDXNn8ubtt1ZjbnNOQGG0"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span className="font-label text-secondary uppercase tracking-[0.1em] text-xs mb-2 block">
              Head of Operations
            </span>
            <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
              MARCUS CHEN
            </h3>
            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-6">
              Overseeing the structural integrity of every project, Marcus
              ensures that the precision on paper translates into the permanence
              of our steel and stone.
            </p>
            <div className="flex gap-4">
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="group pt-12">
            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-surface-container">
              <img
                alt="Interior Design Lead"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Professional portrait of a young woman with a thoughtful expression in a cream turtleneck standing in a modern art gallery setting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLjX7uo9pn_PY_sGkEVFy0Dx8Lmrh745hj2VefHaXIq_2Z8ZSnhTlGf7KdBIvrh-WSbsSoE_yYy5akn8Lre8u8A21ptSpdQvF5DuShiitLypQVa0mucor0I1nobwlk1QqAma_tn-wx4u-X5gV7vW6gSazmbtWrXR9glPkdeGZSkoajLSQl1NyTul4ebleS04UZqe5b-4U-ryr7DjeqtGNBWpy_Ht1mvacjSGCyJhvdTjjTfL40s0PwIRBzHzDyuE6qJeFwfLk1Atg"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span className="font-label text-secondary uppercase tracking-[0.1em] text-xs mb-2 block">
              Design Director
            </span>
            <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
              SARA J. WHITTAKER
            </h3>
            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-6">
              Sara specializes in bespoke interiors that balance the grandeur of
              high-ceilings with the intimacy of home, using rare materials from
              around the world.
            </p>
            <div className="flex gap-4">
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </StaggerItem>

          <StaggerItem className="group">
            <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-surface-container">
              <img
                alt="Acquisitions Director"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-alt="Professional portrait of a middle-aged male in a designer suit sitting on the edge of a mahogany desk in a dark office"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvFqFADJXXgRGVWTwcxSNY1wlG3sLJn7APpYxjq4j1_CcjbVldULNvNtt5z83Z2_RxSKGFh4LBHKO6TMeDertIpCdumQFmFOGsmqIIjmq2E0Pj5_gcp-vpymo163k46NDOLKzFF-tApMeIfjVCSEyqmuiWcUKKyxc-JWrDZe7L4KmmZMeZEweOVRkHVMAMTHk_sqRTmpUUumIs6dySBRxJ88vX_o1vJYSAxwdj62OSGGPgMFRaQjdQhUlmVCzeQym68BRAeVV7DzA"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <span className="font-label text-secondary uppercase tracking-[0.1em] text-xs mb-2 block">
              Director of Acquisitions
            </span>
            <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">
              JULIAN BLAKE
            </h3>
            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-6">
              Julian identifies the world's most coveted land parcels, ensuring
              SBK Heights always occupies the most prestigious coordinates in
              the city.
            </p>
            <div className="flex gap-4">
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a
                className="text-primary hover:text-secondary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </StaggerItem>

          <FadeIn direction="up" className="bg-primary p-12 flex flex-col justify-center border-t-4 border-secondary">
            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
              CRAFT YOUR LEGACY WITH US
            </h3>
            <p className="text-on-primary-container font-light mb-8 leading-relaxed">
              We are always seeking exceptional talent in architecture,
              engineering, and luxury real estate. Join a culture of
              uncompromising quality.
            </p>
            <button className="w-full py-4 border border-secondary text-secondary-container font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-300">
              View Careers
            </button>
          </FadeIn>
        </StaggerContainer>
      </section>

      <FadeIn className="bg-primary-container py-24 px-12 text-center">
        <h2 className="text-white text-4xl font-bold mb-8 uppercase">
          WORK WITH THE BEST
        </h2>
        <p className="text-on-primary-container max-w-2xl mx-auto mb-12">
          Connect with our team today to discuss your vision for a life lived at
          new heights.
        </p>
        <button className="bg-secondary text-white px-12 py-5 font-label text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">
          Contact Our Executive Suite
        </button>
      </FadeIn>
    </>
  );
}
