import { GithubIcon } from "@/components/icon/GithubIcon";
import { buttonVariants } from "@/components/ui/button";
import { MailIcon, PhoneOutgoingIcon } from "lucide-react";
import profileImage from "@/assets/selfie0_crop2.jpeg";
import { Section } from "../components/section";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/link";

export function AboutSection() {
  return (
    <Section id="about">
      {/* <h1 className="mt-8 py-2 text-6xl font-bold">소개</h1> */}
      <div className="group relative flex w-fit items-center">
        <img src={profileImage} alt="profile" className="z-10 h-80 rounded-4xl object-cover object-top" />
        <img
          src="/docker-align.png"
          alt="profile"
          className="absolute right-0 h-40 rounded-4xl object-cover object-top transition-all duration-2000 ease-linear group-hover:-right-4 group-hover:translate-x-full"
        />
      </div>
      <h2 className="text-7xl font-bold">
        오지민, <strong className="text-red-400">OH</strong> JIMIN
      </h2>
      <p className="flex flex-wrap text-4xl">
        <span>
          TEL. <strong className="font-normal text-red-400">010-6767-4151</strong>
        </span>
        &nbsp;|&nbsp;
        <span>
          E-MAIL. <strong className="font-normal text-red-400">jimin7020@gmail.com</strong>
        </span>
      </p>
      <p className="text-xl">
        지루한 반복작업을 줄이고, 더 가치있는 일에 집중하도록 하는 도구를 만듭니다. <br />
        깊이있는 요구사항 분석을 통해 효용성 높은 접근방식을 사용합니다.
      </p>
      <ul className="flex gap-4">
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Link
            href="https://github.com/Xeonlink"
            className={cn(buttonVariants({ variant: "outline" }), "size-14 rounded-full")}
          >
            <GithubIcon className="size-full scale-125" />
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Link href="tel:01067674151" className={cn(buttonVariants({ variant: "outline" }), "size-14 rounded-full")}>
            <PhoneOutgoingIcon className="size-full -translate-x-0.5 translate-y-0.5" />
          </Link>
        </motion.li>
        <motion.li whileHover={{ scale: 1.3 }} transition={{ type: "spring" }}>
          <Link
            href="mailto:jimin7020@gmail.com"
            className={cn(buttonVariants({ variant: "outline" }), "size-14 rounded-full")}
          >
            <MailIcon className="size-full" />
          </Link>
        </motion.li>
      </ul>
    </Section>
  );
}
