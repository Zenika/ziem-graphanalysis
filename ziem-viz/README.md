# Configuration needed to run this project

## Creating a neo4j database and a user.

You need to run a Neo4j bolt database on the default url localhost:7687 then configure a file src/config.json with the fields in order to connect to the database :

{
  "NEO4J_SERVER_URL": "bolt://localhost:7687",
  "NEO4J_CLIENT_ID": "yourUserId",
  "NEO4J_CLIENT_PWD": "yourUserPwd"
}

This user needs to be able to have the permissions of the publisher role (see neo4j default roles).

## Populating the database

For starter, you can use copy paste this in your neo4j browser to populate your database with sample data :

CREATE CONSTRAINT ON (node:`UNIQUE IMPORT LABEL`) ASSERT (node.`UNIQUE IMPORT ID`) IS UNIQUE;
CALL db.awaitIndexes(300);
UNWIND [{_id:0, properties:{ip:"192.168.34.100"}}, {_id:1, properties:{ip:"192.168.34.101"}}, {_id:2, properties:{ip:"224.0.0.22"}}, {_id:3, properties:{ip:"224.0.0.251"}}, {_id:4, properties:{ip:"10.132.16.2"}}, {_id:5, properties:{ip:"108.177.15.95"}}, {_id:6, properties:{ip:"192.168.34.1"}}, {_id:7, properties:{ip:"192.168.34.99"}}, {_id:8, properties:{ip:"10.132.16.3"}}, {_id:9, properties:{ip:"173.194.76.95"}}, {_id:10, properties:{ip:"10.132.16.5"}}, {_id:11, properties:{ip:"216.239.34.174"}}, {_id:12, properties:{ip:"213.36.253.176"}}, {_id:13, properties:{ip:"147.75.40.150"}}, {_id:14, properties:{ip:"52.222.174.4"}}] AS row
CREATE (n:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row._id}) SET n += row.properties SET n:Host;
UNWIND [{start: {_id:0}, end: {_id:2}, properties:{count:7}}, {start: {_id:0}, end: {_id:3}, properties:{count:23}}, {start: {_id:1}, end: {_id:2}, properties:{count:7}}, {start: {_id:1}, end: {_id:3}, properties:{count:23}}, {start: {_id:4}, end: {_id:5}, properties:{count:19}}, {start: {_id:0}, end: {_id:7}, properties:{count:4007}}, {start: {_id:1}, end: {_id:7}, properties:{count:4005}}, {start: {_id:6}, end: {_id:7}, properties:{count:4005}}, {start: {_id:7}, end: {_id:1}, properties:{count:4013}}, {start: {_id:7}, end: {_id:0}, properties:{count:4013}}, {start: {_id:7}, end: {_id:6}, properties:{count:4013}}, {start: {_id:8}, end: {_id:9}, properties:{count:3}}, {start: {_id:0}, end: {_id:9}, properties:{count:267}}, {start: {_id:9}, end: {_id:0}, properties:{count:224}}, {start: {_id:10}, end: {_id:11}, properties:{count:3}}, {start: {_id:1}, end: {_id:11}, properties:{count:111}}, {start: {_id:11}, end: {_id:1}, properties:{count:95}}, {start: {_id:7}, end: {_id:5}, properties:{count:133}}, {start: {_id:5}, end: {_id:7}, properties:{count:111}}, {start: {_id:7}, end: {_id:12}, properties:{count:7}}] AS row
MATCH (start:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.start._id})
MATCH (end:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.end._id})
CREATE (start)-[r:TO]->(end) SET r += row.properties;
UNWIND [{start: {_id:12}, end: {_id:7}, properties:{count:7}}, {start: {_id:7}, end: {_id:13}, properties:{count:9}}, {start: {_id:13}, end: {_id:7}, properties:{count:9}}, {start: {_id:7}, end: {_id:14}, properties:{count:11}}, {start: {_id:14}, end: {_id:7}, properties:{count:11}}, {start: {_id:1}, end: {_id:9}, properties:{count:153}}, {start: {_id:9}, end: {_id:1}, properties:{count:127}}] AS row
MATCH (start:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.start._id})
MATCH (end:`UNIQUE IMPORT LABEL`{`UNIQUE IMPORT ID`: row.end._id})
CREATE (start)-[r:TO]->(end) SET r += row.properties;
MATCH (n:`UNIQUE IMPORT LABEL`)  WITH n LIMIT 20000 REMOVE n:`UNIQUE IMPORT LABEL` REMOVE n.`UNIQUE IMPORT ID`;
DROP CONSTRAINT ON (node:`UNIQUE IMPORT LABEL`) ASSERT (node.`UNIQUE IMPORT ID`) IS UNIQUE;

## Running the app

Use 'npm start' at the root of this directory.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
