import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "still figuring out what trpc queries do..." });
  
  return (
    <>
      <Head>
        <title>Discord T3 App</title>
        <meta name="description" content="Generated by create-t3-app. Edited by Richard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Discord Art Gallery <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
            <h1 className="text-4x2 text-black">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;



const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const { data: getAllUsers } = api.example.getAllUsers.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const { data: getAllGenerations } = api.example.getAllGenerations.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const {data: getAllGenerationsTimeSents } = api.example.getAllGenerationsTimeSents.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name} </span>}
        {secretMessage && <span> - {secretMessage}</span>}
        {/* {JSON.stringify(getAllUsers) && <span> - {JSON.stringify(getAllUsers)}</span>} */}
        {/* {JSON.stringify(getAllGenerations) && <span> - {JSON.stringify(getAllGenerations)}</span>} */}
        
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      
    
    <ul className="text-center text-2xl text-white">
      {   getAllGenerations && getAllGenerations.map((generation) => (
          <li key={generation.imgurl}> <a href={`${generation.imgurl}`}>{}</a>
            <hr/>
            <br></br>
            <p className="text-center text-2xl text-white">{}</p>
            <img src={`${generation.imgurl}`} alt="new" className="md:inline-flex items-center justify-center"/>
            <h1 className="text-center text-2x1 font-bold text-white"> Art Title: {generation.prompt}</h1>
            <p className="text-center text-sm text-black">(Warning: Profanity filter is semi-functional)</p>
            <p className="text-center text-sm text-white">Above Art by: {generation.user.name}</p>
            <p className="text-center text-sm text-white">Art ID: {generation.id}</p>
            <br></br>
            <hr/>
          </li>
          ))}
          
    </ul>
      
      
      </div>
  );
};
