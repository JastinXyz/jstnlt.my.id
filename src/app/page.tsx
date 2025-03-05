"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import Textarea from "@/components/textarea";
import buildValidationError from "@/lib/build-validation-error";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTelegram, IconMail } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactInputs = { name: string; email: string; message: string; }

export default function Home() {
  let { register, handleSubmit, reset, setError, formState: { errors } } = useForm<ContactInputs>();
  let [loading, setLoading] = useState<boolean>(false);
  let [contrib, setContrib] = useState<string>("fetching...");
  let [GHLang, setGHLang] = useState<string>("fetching...");

  useEffect(() => {
    const fetchStats = async() => {
      try {
        let get = await fetch('/api/stats');
        let data = await get.json();

        setContrib(data.contributed_to);
        setGHLang(data.most_used_lang);
      } catch {
        setContrib('failed to load...');
        setGHLang('failed to load...');
      }
    }

    fetchStats();
  }, []);

  let sendMessage: SubmitHandler<ContactInputs> = async(d) => {
    try {
      setLoading(true);
      let { data } = await axios('/api/sendmessage', { method: 'POST', data: d });

      toast.success(data.message);
      reset();
      setLoading(false);
    } catch (error) {
      buildValidationError(error, setError);
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar page="home" />
      <div className="mt-20">
        <h1 className="text-xl md:text-2xl text-gray-900 font-bold">Hi 👋, I'm Jastin Linggar Tama.</h1>
        <div className="text-neutral-700 text-justify leading-7 flex flex-col gap-4 mt-2">
          <p>
            I am a software engineering student with a deep passion for programming. Since 2020, I have been actively learning and building various projects, 
            shaping my expertise in web development. I enjoy creating efficient, scalable, and user-friendly digital solutions while continuously improving my 
            technical and problem-solving skills.
          </p>
          <p>
            Beyond programming, I also have experience in UI/UX design, ensuring that the applications I build are not only functional but also intuitive and 
            visually appealing.
          </p>
          <p>
            As a self-taught programmer, I have contributed to <span className="highlight">{contrib}</span> repositories on GitHub, with <span className="highlight">{GHLang}</span> as my most frequently used languages. My 
            experience spans across multiple projects, from small personal experiments to larger, more complex applications.
          </p>
          <p>
            Currently based in Purwokerto, Indonesia, I am always eager to learn, innovate, and collaborate on exciting projects. I thrive in environments 
            where I can challenge myself, explore new technologies, and contribute to impactful solutions.
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <Link href={'https://github.com/JastinXyz'} target="_blank" className="text-neutral-700 hover:text-neutral-900"><IconBrandGithub className="w-6 h-6" /></Link>
          <Link href={'https://instagram.com/jstn.lt'} target="_blank" className="text-neutral-700 hover:text-neutral-900"><IconBrandInstagram className="w-6 h-6" /></Link>
          <Link href={'https://www.linkedin.com/in/jastinlinggartama'} target="_blank" className="text-neutral-700 hover:text-neutral-900"><IconBrandLinkedin className="w-6 h-6" /></Link>
          <Link href={'https://t.me/jstnlt'} target="_blank" className="text-neutral-700 hover:text-neutral-900"><IconBrandTelegram className="w-6 h-6" /></Link>
          <Link href={'mailto:jastinlinggar@gmail.com'} target="_blank" className="text-neutral-700 hover:text-neutral-900"><IconMail className="w-6 h-6" /></Link>
        </div>
      </div>
      <div className="mt-32">
        <h1 className="text-xl md:text-2xl text-gray-900 font-bold">Get In Touch 📮</h1>
        <form onSubmit={handleSubmit(sendMessage)} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700">
            <div>
              <label htmlFor="name">name</label>
              <Input type="text" id="name" {...register('name', { required: true })} placeholder="jstn" />
              <span className="text-xs text-red-500">{errors.name?.message}</span>
            </div>
            <div>
              <label htmlFor="email">email</label>
              <Input type="email" id="email" {...register('email', { required: true })} placeholder="jstn@example.com" />
              <span className="text-xs text-red-500">{errors.email?.message}</span>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message">message</label>
            <Textarea id="message" {...register('message', { required: true })} placeholder="hello world!" />
            <span className="text-xs text-red-500">{errors.message?.message}</span>
          </div>
          <div className="mt-2">
            <Button className="w-full" disabled={loading}>send message</Button>
          </div>
        </form>
      </div>
    </>
  );
}
