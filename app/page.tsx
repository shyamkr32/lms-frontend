import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-[90vw] mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 pt-28 pb-12">
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">Your progess</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">See result</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">Java</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">Next Js</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 col-span-2 hover:bg-zinc-700 hover:transition-all hover:duration-300">React Js</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
            <div className="rounded-2xl bg-zinc-800 h-48 p-6 hover:bg-zinc-700 hover:transition-all hover:duration-300">DSA</div>
        </div>
      </div>
    </> 
  );
}
