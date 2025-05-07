import { PhoneCall } from "lucide-react";
export default function Home() {
  return (
    <div className="flex gap-5 justify-center items-center bg-amber-200 min-h-screen">
      <PhoneCall size={30}/>
      <p className="text-xl">Google Meet</p>
    </div>
  );
}
