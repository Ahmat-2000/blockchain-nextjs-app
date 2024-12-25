import Transactions from "@/components/Transactions";
import Services from "./services/page";
// import Hr from "@/components/Hr";

export default function Home() {
  return (
    <>
      <Services />
      {/* <Hr /> */}
      <Transactions />
    </>
  );
}
