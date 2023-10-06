# ELearn - Learning Platform Powered by Blockchain

ELEARN is an innovative online learning and earning platform that leverages the power of blockchain technology to provide a secure and transparent educational experience. With ELEARN, students and educators can connect, collaborate, and engage in a decentralized ecosystem that ensures data integrity, authentication, and accountability.

|          Desktop          |
| :-----------------------: |
| ![](scaffold-desktop.png) |

## Build and Run

Install dependencies

```bash
npm install
# or
yarn install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Features

Decentralized Learning: ELEARN operates on a decentralized network, allowing students and educators to interact directly without intermediaries. This fosters trust and transparency in the learning process.

Secure Credentials: Certificates and academic achievements are securely stored on the blockchain, making it easy for students to share their credentials with employers or other institutions.

ELN Token Integration: ELEARN utilizes the ELN token, an SPL token on the Solana blockchain, for secure and efficient transactions within the platform. Users can earn, spend, and trade ELN tokens for various educational services.

Unlockable Content: Users can access premium educational content by using ELN tokens for unlocking sections, courses, or resources, enhancing the platform's gamified learning experience.

Peer-to-Peer Payments: ELEARN supports peer-to-peer payments, enabling educators to receive payments directly from students without the need for traditional financial intermediaries.

### Structure

The ELearn project structure may vary based on the front end framework being utilized. The below is an example structure for the Next js Scaffold.

```
├── public : publically hosted files
├── src : primary code folders and files
│   ├── components : should house anything considered a resuable UI component
│   ├── contexts` : any context considered reusable and useuful to many compoennts that can be passed down through a component tree
│   ├── hooks` : any functions that let you 'hook' into react state or lifecycle features from function components
│   ├── models` : any data structure that may be reused throughout the project
│   ├── pages` : the pages that host meta data and the intended `View` for the page
│   ├── stores` : stores used in state management
│   ├── styles` : contain any global and reusable styles
│   ├── utils` : any other functionality considered reusable code that can be referenced
│   ├── views` : contains the actual views of the project that include the main content and components within
style, package, configuration, and other project files

```

## Contributing

Anyone is welcome to create an issue to build, discuss or request a new feature or update to the existing code base. Please keep in mind the following when submitting an issue. We consider merging high value features that may be utilized by the majority of ELEARN users. If this is not a common feature or fix, consider adding it to the component library or cookbook. Please refer to the project's architecture and style when contributing.

If submitting a feature, please reference the project structure shown above and try to follow the overall architecture and style presented in the existing scaffold.

### Committing

To choose a task or make your own, do the following:

1. [Add an issue](https://github.com/AruArshad/E-Learn/issues/new) for the task and assign it to yourself or comment on the issue
2. Make a draft PR referencing the issue.

The general flow for making a contribution:

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

## Learn More Next Js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
