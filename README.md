# Project Name: Maths Rocks

Deployed Website: http://13.211.213.56/

Project Report: 

Our project provides Kiwi kids with an engaging educational web application that works in tandem with the real world hobby of searching for painted rocks, making positive associations between maths, treasure hunting, fun and discovery.

## Technologies Used
Technologies used to build the project (include the languages used, the libraries and their versions).

- JavaScript
- Vanilla CSS
- [React 18.2.66](https://react.dev/) installed with [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/en/main)
- [emailjs 4.3.3](https://www.emailjs.com/)
- [Quill Rich Text Editor](https://quilljs.com/) for React
- [PostgreSQL](https://www.postgresql.org/)
- [pgAdmin 4](https://www.pgadmin.org/)
- [Express 4.19.2](https://expressjs.com/) web framework for [Node.js](https://nodejs.org/en)

## Installation Instructions

Instructions on how to install and setup the project (specify all dependencies).

**Prerequisites**
- Install [Node.js](https://nodejs.org/en/download).
- Install PostgreSQL and PgAdmin.
- Create a new database with PostgreSQL, name the database as "maths_rocks".
  
**Client Folder (Fronted)**
- In your command line, cd to the *client* folder, then run <code>npm install</code> to install all dependencies.
- In your command line, run <code>npm run dev</code> to start the project.
- To end the project type <code>Ctrl + C </code> in your command line.
  
**Server Folder (Backend)**
- In the database-utils/config.js file, change the password to your postgreSQL user password.
- In your command line, cd to the *server* folder, then run: <code>npm install</code> to install all dependencies.
- In your command line, run <code>npm run devStart</code> to start the project.
- To end the project type <code>Ctrl + C </code> in your command line.

**Database**
The database is hosted on AWS. Here is how to access it.
- Install PgAdmin.
- Register a new connection to the database.
- Specify the IP address of the AWS virtual machine, currently it is 13.211.213.56, but that might be changed in the future.
- Specify your PostgreSQL user account, and the password.

**Content Management System (CMS)**

Administrative rights are needed to access the CMS. Once logged in as an Admin, the CMS can be accessed from the **Content Management** item in the navigation.

![image](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-11/assets/159106252/6d59abb9-977d-4f10-a2d2-2246b6adb683)

![image](https://github.com/uoa-compsci399-s1-2024/capstone-project-2024-s1-team-11/assets/159106252/15a1e844-e31d-4bc4-bc06-3d6a9ef9a570)

## Usage Examples (if available).

## Future Plan (Ideas for future releases)

## Contributors

- Tech Lead: Edward Lam
- Team Leader, Frontend, UI/UX: Helen Emmett
- Backend, Frontend: Aaron Quiat
- Backend, Frontend: Alyssa Lee Sang
- Backend, Frontend: Kelly Williams
- Backend, Frontend: Jie He 

## Acknowledgements

### Tutorials Used
#### Front-end
- Learning React and how to think in React: https://react.dev/learn
- React router createBrowserRouter tutoral: https://reactrouter.com/en/main/start/tutorial
- Learning React: https://youtu.be/5ZdHfJVAY-s?si=OpaMQGt9UGh4AE0P
- How to use Quill editor with React: https://youtu.be/I3JQNq7Cbt0?si=okbB4NFFChEpGGEB
- Responsive Navbar in React using React Router: https://www.youtube.com/watch?v=17l6AOc8s10
- Add Waves, Shapes & Curves to your Website: https://www.youtube.com/shorts/AnP5CPVtO7Y
- Learn React Router v6 – Full Course: https://www.youtube.com/watch?v=SMq1IQRweDc&t=2450s

#### Back-end
- Learn JavaScript - Full Course for Beginners: https://www.youtube.com/watch?v=PkZNo7MFNFg
- Node.js and Express.js - Full Course: https://www.youtube.com/watch?v=Oe421EPjeBE

#### Deploying the Web-App
- Understanding the PERN stack: https://www.freecodecamp.org/news/learn-the-pern-stack-full-course/
- Deploying a PERN stack application to AWS: https://www.youtube.com/watch?si=TUiqcPWXnipddPkW&v=NjYsXuSBZ5U&feature=youtu.be
- Deploying a PERN stack application to AWS: https://github.com/calvin-puram/AWS-EC2-Demo

### Images Used

- Main image is a stock photo from [iStock](https://www.istockphoto.com/photo/hand-painted-colorful-stones-and-pens-gm1055477172-282032140)
- Avatar images designed by [freepik](https://www.freepik.com/)
- Placeholder rock images created with [Adobe Express](https://new.express.adobe.com/) text-to-image
- Topic Images (number images) are obtained from Pixels (https://www.pexels.com/)

### Project Management tool
[Jira Gantt Chart](https://exquisitech.atlassian.net/jira/software/projects/KAN/boards/1/timeline?timeline=QUARTERS&shared=&atlOrigin=eyJpIjoiZWFhOWU5YzYwYjhmNGI5MGFmY2FlZTBkYzU4YWIzNWEiLCJwIjoiaiJ9)
