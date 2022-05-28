const {
  client,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  createPost,
  updatePost,
  getAllPosts,
  getPostsByUser,
} = require('./index');

const createTables = async () => {
  try {
    console.log('Starting to build tables...');

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );
      CREATE TABLE posts(
        id SERIAL PRIMARY KEY,
        "authorId" INTEGER REFERENCES users(id) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        active BOOLEAN DEFAULT true
      );
    `);

    console.log('Finished building tables!');
  } catch (error) {
    console.log('Error building tables!');
    throw error;
  }
};

const dropTables = async () => {
  try {
    console.log('Starting to drop tables...');

    await client.query(
      `DROP TABLE IF EXISTS posts; 
       DROP TABLE IF EXISTS users;`
    );

    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error dropping tables!');
    throw error;
  }
};

const createInitialUsers = async () => {
  try {
    console.log('Starting to create users...');

    await createUser({
      username: 'albert',
      password: 'bertie99',
      name: 'Al Bert',
      location: 'Sydney, Australia',
      active: true,
    });

    await createUser({
      username: 'sandra',
      password: '2sandy4me',
      name: 'Just Sandra',
      location: `A'int tellin`,
      active: true,
    });

    await createUser({
      username: 'glamgal',
      password: 'soglam',
      name: `Joshua`,
      location: `Upper East Side`,
      active: true,
    });

    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
};

const createInitialPosts = async () => {
  try {
    const [albert, sandra, glamgal] = await getAllUsers();

    console.log('Starting to create posts...');

    await createPost({
      authorId: albert.id,
      title: 'First Post',
      content:
        'This is my first post. I hope I love writing blogs as much as I love writing them.',
    });

    await createPost({
      authorId: sandra.id,
      title: 'How does this work?',
      content: 'Seriously, does this even do anything?',
    });

    await createPost({
      authorId: glamgal.id,
      title: 'Living the Glam Life',
      content: 'Do you even? I swear that half of you are posing.',
    });

    console.log('Finished creating posts!');
  } catch (error) {
    console.log('Error creating posts!');
    throw error;
  }
};

const testDB = async () => {
  try {
    console.log('Starting to test database...');

    console.log('Calling getAllUsers');
    const users = await getAllUsers();
    console.log('Result:', users);

    console.log('Calling updateUser on users[0]');
    const updateUserResult = await updateUser(users[0].id, {
      name: 'Newname Sogood',
      location: 'Lesterville, KY',
    });
    console.log('Result:', updateUserResult);

    console.log('Calling getAllPosts');
    const posts = await getAllPosts();
    console.log('Result:', posts);

    console.log('Calling updatePost on posts[0]');
    const updatePostResult = await updatePost(posts[0].id, {
      title: 'New Title',
      content: 'Updated Content',
    });
    console.log('Result:', updatePostResult);

    console.log('Calling getUserById with 1');
    const albert = await getUserById(1);
    console.log('Result:', albert);

    console.log('Finished database tests!');
  } catch (error) {
    console.log('Error during testDB');
    throw error;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialPosts();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
};

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
