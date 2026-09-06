import {
    Icon,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandTelegram,
    IconMail,
    IconProps,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type socialsData = Array<{
    href: string;
    label: string;
    handle: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}>;

const socials: socialsData = [
    { href: "https://github.com/JastinXyz", label: "GitHub", handle: "JastinXyz", icon: IconBrandGithub },
    { href: "https://www.linkedin.com/in/jastinlinggartama", label: "LinkedIn", handle: "jastinlinggartama", icon: IconBrandLinkedin },
    { href: "https://t.me/jstnlt", label: "Telegram", handle: "jstnlt", icon: IconBrandTelegram },
    { href: "https://instagram.com/jstn.lt", label: "Instagram", handle: "jstn.lt", icon: IconBrandInstagram },
    { href: "mailto:jastinlinggar@gmail.com", label: "Email", handle: "jastinlinggar@gmail.com", icon: IconMail },
];

export default socials;
