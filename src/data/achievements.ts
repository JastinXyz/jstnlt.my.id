/* Placement detail follows the LinkedIn honours entries, including what
 * LKS is, which is the part that makes the national round mean something
 * to a reader who has never heard of it. */
export const LKS_NOTE =
    "LKS, short for Lomba Kompetensi Siswa, is Indonesia's national skills competition for vocational high schools. Reaching the national round means placing first at regency level and then at provincial level in the same year.";

type achievementsData = Array<{
    /** placement as typed, not as an emoji medal, it has to set in the page's own type */
    rank: string;
    year: number;
    event: string;
    category: string;
    issuer: string;
    /** anything worth saying beyond the placement itself */
    note?: string;
    tasks: string[];
}>;

const achievements: achievementsData = [
    {
        rank: '1st',
        year: 2025,
        event: 'LKS SMK Banyumas Regency',
        category: 'IT Software Solution for Business',
        issuer: 'Dinas Pendidikan Kabupaten Banyumas',
        note: 'A separate category from Web Technology, closer to desktop and data work.',
        tasks: [
            'Database Development: Create a SQL database design to be used in the next module.',
            'Desktop App: Creating a hotel management including transactions and reports using C# and .Net Framework.',
        ]
    },
    {
        rank: '3rd',
        year: 2024,
        event: 'Code Colab Hackathon',
        category: 'Hackathon',
        issuer: 'Telkom University Purwokerto',
        tasks: [
            'Create a review and rating website for Micro, Small, and Medium Enterprises.',
            'Create UI/UX designs and website prototypes, then program the website so that it can be used publicly.',
        ]
    },
    {
        rank: 'Top 4',
        year: 2024,
        event: 'National LKS SMK',
        category: 'Web Technology',
        issuer: 'Kementerian Pendidikan',
        note: 'Awarded a Medallion of Excellence, given to competitors whose work passes the standard threshold rather than for placement alone.',
        tasks: [
            'Client Side: Create a client-side game using vanilla javascript.',
            'Speedtest: Perform multiple tasks with specific requirements and rules in a fairly short period of time.',
            'Server Side: Create a RESTful API with Laravel and consume it on the frontend with React.js (topic: course app)'
        ]
    },
    {
        rank: '1st',
        year: 2024,
        event: 'LKS SMK Jawa Tengah Province',
        category: 'Web Technologies',
        issuer: 'Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah',
        note: 'The provincial round, which qualified me for the national final.',
        tasks: [
            'Client Side: Create a client-side game using vanilla javascript.',
            'Server Side: Create a RESTful API with Laravel and consume it on the frontend with React.js (topic: gaming platforms)'
        ]
    },
    {
        rank: '1st',
        year: 2024,
        event: 'LKS SMK Banyumas Regency',
        category: 'Web Technologies',
        issuer: 'Dinas Pendidikan Kabupaten Banyumas',
        note: 'The regency round, which qualified me for the provincial round.',
        tasks: [
            'Backend: Create a REST API using Laravel (topic: destination)',
            'Frontend: Consume the API that was created earlier using Next.js.'
        ]
    },
    {
        rank: '2nd',
        year: 2023,
        event: 'LKS SMK Banyumas Regency',
        category: 'Web Technologies',
        issuer: 'Dinas Pendidikan Kabupaten Banyumas',
        note: 'A year before winning the same category.',
        tasks: [
            'Backend: Create a REST API using Laravel (topic: culinary)',
            'Frontend: Design using TailwindCSS and consume the API.'
        ]
    },
];

export default achievements;
