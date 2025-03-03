type achievementsData = Array<{
    listStyle: string;
    name: string;
    tasks: string[];
}>;

const achievements: achievementsData = [
    {
        listStyle: '🏅',
        name: 'Top 4 at National LKS SMK 2024 Web Technology.',
        tasks: [
            'Client Side: Create a client-side game using vanilla javascript.',
            'Speedtest: Perform multiple tasks with specific requirements and rules in a fairly short period of time.',
            'Server Side: Create a RESTful API with Laravel and consume it on the frontend with React.js (topic: course app)'
        ]
    },
    {
        listStyle: '🥇',
        name: '1st Place at LKS SMK Jawa Tengah Province 2024 Web Technologies.',
        tasks: [
            'Client Side: Create a client-side game using vanilla javascript.',
            'Server Side: Create a RESTful API with Laravel and consume it on the frontend with React.js (topic: gaming platforms)'
        ]
    },
    {
        listStyle: '🥇',
        name: '1st Place at LKS SMK Banyumas Regency 2024 Web Technologies.',
        tasks: [
            'Backend: Create a REST API using Laravel (topic: destination)',
            'Frontend: Consume the API that was created earlier using Next.js.'
        ]
    },
    {
        listStyle: '🥈',
        name: '2nd Place at LKS SMK Banyumas Regency 2023 Web Technologies.',
        tasks: [
            'Backend: Create a REST API using Laravel (topic: culinary)',
            'Frontend: Design using TailwindCSS and consume the API.'
        ]
    },
];

export default achievements;