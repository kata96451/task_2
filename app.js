import fs from 'fs/promises'

console.clear();

const DB_PATH = 'db.json';

const include = (users, condition) => {
  const conditionValue = condition.include;

  let usersFiltered = users;

  conditionValue.forEach(element => {
    const exclusion = (Object.entries(element)[0]).toString();

    usersFiltered = usersFiltered.filter(user => Object.entries(user).some(entry => {
      return entry.toString() === exclusion
    }));
  });
}

const exclude = (users, condition) => {
  const arr = condition.exclude;
  let usersFiltered = users;
  
  arr.forEach(element => {
    const exclusion = (Object.entries(element)[0]).toString();

    usersFiltered = usersFiltered.filter(user => Object.entries(user).every(entry => {
      return entry.toString() !== exclusion
    }));
  });

  return usersFiltered;
}

const sort = (users, condition) => {
  const sortValue = condition["sort_by"];

  let sortedUsers = users.sort((user1, user2) => {
    if (typeof user1.sortValue === 'string') {
      return user1[sortValue].localeCompare(user2[sortValue]);
    } else {
      return user1[sortValue] - user2[sortValue];
    }
  })

  return sortedUsers;
}

async function example() {
  let data = JSON.parse(await fs.readFile(DB_PATH, { encoding: 'utf8' }));
  let condition = Object.keys(data.condition);

  condition.forEach(state => {
    if (state === 'exclude') {
      data = {
        ...data,
        data: exclude(data.data, data.condition)
      }
    };

    if (state === 'sort_by') {
      data = {
        ...data,
        data: sort(data.data, data.condition)
      }
    }

    if (state === 'include') {
      data = {
        ...data,
        data: include(data.data, data.condition)
      }
    }

    const result = JSON.stringify(data);

    try {
      fs.writeFile('result.json', result)
    } catch (err) {
      console.log(err)
    }
  })
}
example();
