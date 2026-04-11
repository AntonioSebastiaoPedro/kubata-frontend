import Image from "next/image";
import icon from "@/src/assets/images/iconKubata.png"

export default function Home() {
  return (
    <div className="">
      <Image src={icon} alt="Icon Kubata" />
      <h1 className="text-4xl font-bold mt-4">Bem-vindo ao Kubata!</h1>
    </div>
  );
}
