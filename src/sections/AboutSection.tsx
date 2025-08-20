import profileImage from "@/assets/selfie0_crop2.jpeg";
import { GithubIcon } from "@/components/icon/GithubIcon";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneOutgoingIcon } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "../components/section";

export function AboutSection() {
  return (
    <Section id="about">
      <div className="group relative flex w-fit items-center">
        <img src={profileImage} alt="profile" className="z-10 h-80 rounded-4xl object-cover object-top" />
        <img
          src="/docker-align.png"
          alt="profile"
          className="absolute right-0 h-40 rounded-4xl object-cover object-top transition-all duration-2000 ease-linear group-hover:-right-4 group-hover:translate-x-full"
        />
      </div>
      <h2 className="text-7xl font-bold">
        오지민, <strong className="text-accent">OH</strong> JIMIN
      </h2>
      <p className="text-4xl">
        TEL. <span className="text-accent">010-6767-4151</span>
        {" | "}
        E-MAIL. <span className="text-accent">jimin7020@gmail.com</span>
      </p>
      <p className="text-xl">
        지루한 반복작업을 줄이고, 더 가치있는 일에 집중하도록 하는 도구를 만듭니다. <br />
        깊이있는 요구사항 분석을 통해 효용성 높은 접근방식을 사용합니다.
      </p>
      <ul className="flex gap-4">
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Button variant="outline" className="size-14 rounded-full" asChild>
            <Link href="https://github.com/Xeonlink">
              <GithubIcon className="size-full scale-125" />
            </Link>
          </Button>
        </motion.li>
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Button variant="outline" className="size-14 rounded-full" asChild>
            <Link href="tel:01067674151">
              <PhoneOutgoingIcon className="size-full -translate-x-0.5 translate-y-0.5" />
            </Link>
          </Button>
        </motion.li>
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Button variant="outline" className="size-14 rounded-full" asChild>
            <Link href="mailto:jimin7020@gmail.com">
              <MailIcon className="size-full" />
            </Link>
          </Button>
        </motion.li>
      </ul>
    </Section>
  );
}
