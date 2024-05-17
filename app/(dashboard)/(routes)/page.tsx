import {  RedirectToSignIn, RedirectToSignUp, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
      <div>
          Home page
          <UserButton afterSignOutUrl="/" />
          <RedirectToSignIn/>
          <RedirectToSignUp/>
      </div>
  );
}
