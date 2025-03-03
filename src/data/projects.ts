import { Icon, IconBrandAlgolia, IconBrandBulma, IconBrandHtml5, IconBrandJavascript, IconBrandNextjs, IconBrandNodejs, IconBrandNpm, IconBrandTailwind, IconBrandTypescript, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type projectsData = Array<{
    name: string;
    description: string;
    technologies: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>[];
    links: {
        github?: string;
        demo?: string;
    };
}>;

const projects: projectsData = [
    {
        name: '@mengodingan/ckptw',
        description: 'A library that is used to easily create a Whatsapp bot, and has many features in it.',
        technologies: [IconBrandTypescript, IconBrandNpm],
        links: {
            github: 'https://github.com/mengkodingan/ckptw',
            demo: 'https://npmjs.com/@mengkodingan/ckptw'
        }
    },
    {
        name: 'Discord Bot Landing Page',
        description: 'A free Landing page template that uses Bulma to build it for your Discord Bot.',
        technologies: [IconBrandHtml5, IconBrandBulma],
        links: {
            github: 'https://github.com/JastinXyz/discord-bot-landing-page-web',
            demo: 'https://jastinxyz.github.io/discord-bot-landing-page-web'
        }
    },
    {
        name: 'Quran Digital',
        description: 'Online Quran website with Indonesian translation. Built with Next.js and Algolia for search purposes.',
        technologies: [IconBrandNextjs, IconBrandTailwind, IconBrandAlgolia],
        links: {
            github: 'https://github.com/JastinXyz/quran-digital',
            demo: 'https://quran.jstnlt.my.id/'
        }
    },
    {
        name: 'Lofidex',
        description: 'Enjoy some lo-fi music with a relaxing background of ambient sounds in Discord. w/Lumidex',
        technologies: [IconBrandNodejs],
        links: {
            github: 'https://github.com/lumidexstudio/lofidex',
        }
    },
    {
        name: 'cukuftawu',
        description: 'An example of a whatsapp bot using the @mengkodingan/ckptw library.',
        technologies: [IconBrandTypescript, IconBrandNodejs],
        links: {
            github: 'https://github.com/JastinXyz/cukuftawu',
        }
    },
    {
        name: 'Brat Generator',
        description: 'A simple website that can produce brat meme images according to what you write.',
        technologies: [IconBrandNextjs, IconBrandTailwind],
        links: {
            github: 'https://github.com/JastinXyz/bratbretbrot',
            demo: 'https://brat.lumidex.id/',
        }
    },
    {
        name: 'kbbi.js',
        description: 'a small npm library as a wrapper for Kamus Besar Bahasa Indonesia.',
        technologies: [IconBrandJavascript, IconBrandNpm],
        links: {
            github: 'https://github.com/JastinXyz/kbbi.js',
            demo: 'https://www.npmjs.com/package/kbbi.js',
        }
    },
    {
        name: '@mengkodingan/consolefy',
        description: '@mengkodingan/consolefy is a customizable logging library 🙂.',
        technologies: [IconBrandTypescript, IconBrandNpm],
        links: {
            github: 'https://github.com/Mengkodingan/consolefy',
            demo: 'https://www.npmjs.com/@mengkodingan/consolefy',
        }
    },
    {
        name: '@affandra-solusi-teknologi/tumpaksewu',
        description: 'A package that makes it easy to create cascading dropdowns in nextjs.',
        technologies: [IconBrandNextjs, IconBrandNpm],
        links: {
            github: 'https://github.com/AFFANDRA-SOLUSI-TEKNOLOGI/tumpaksewu',
            demo: 'https://www.npmjs.com/package/@affandra-solusi-teknologi/tumpaksewu',
        }
    },
    {
        name: 'mysql dump over Telegram',
        description: 'A simple code that will backup your MySQL database on a schedule with mysqldump and send the files to Telegram.',
        technologies: [IconBrandTypescript, IconBrandNodejs],
        links: {
            github: 'https://github.com/AFFANDRA-SOLUSI-TEKNOLOGI/MysqldumpOverTelegram',
        }
    },
    {
        name: 'telegraf command handler',
        description: 'An npm package that is used as middleware in the "telegraf" package to create command handlers in your Telegram bot.',
        technologies: [IconBrandJavascript, IconBrandNpm],
        links: {
            github: 'https://github.com/JastinXyz/telegraf-command-handler',
            demo: 'https://npmjs.com/telegraf-command-handler'
        }
    },
    {
        name: 'Indonesia Logo',
        description: 'Regency & Subdistrict Logos in Indonesia. Complete with crawler.',
        technologies: [IconBrandJavascript],
        links: {
            github: 'https://github.com/JastinXyz/indonesia-logo',
        }
    },
    {
        name: 'whatsactyl',
        description: 'A Whatsapp bot for managing Pterodactyl panels with many available features.',
        technologies: [IconBrandNodejs],
        links: {
            github: 'https://github.com/JastinXyz/whatsactyl',
        }
    },
    {
        name: 'whatscode.js',
        description: 'A package to create Whatsapp bots easily and quickly, even coding experience is not really needed.',
        technologies: [IconBrandJavascript, IconBrandNpm],
        links: {
            github: 'https://github.com/JastinXyz/whatscode.js',
        }
    },
];

export default projects;